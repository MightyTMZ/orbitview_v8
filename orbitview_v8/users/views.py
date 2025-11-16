from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from decouple import config
from django.contrib.auth import login
from django.conf import settings
from django.http import StreamingHttpResponse
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from groq import Groq
import re

from .models import User, OrbitViewProfile


@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    """
    Authenticate user with Google ID token.
    Creates a new user if they don't exist, otherwise logs them in.
    """
    token = request.data.get('token')
    
    if not token:
        return Response(
            {'error': 'Google ID token is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    client_id = settings.GOOGLE_OAUTH2_CLIENT_ID
    if not client_id:
        return Response(
            {'error': 'Google OAuth client ID is not configured'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    
    try:
        # Verify the token with Google
        idinfo = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            client_id
        )
        
        # Extract user information
        google_id = idinfo['sub']
        email = idinfo['email']
        email_verified = idinfo.get('email_verified', False)
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        picture = idinfo.get('picture', '')
        name = idinfo.get('name', f'{first_name} {last_name}'.strip())
        
        # Get or create user
        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'username': _generate_username(email, name),
                'first_name': first_name,
                'last_name': last_name,
                'email_verified': email_verified,
                'avatar_url': picture,
                'is_active': True,
            }
        )
        
        # Update user information if not new
        if not created:
            user.first_name = first_name or user.first_name
            user.last_name = last_name or user.last_name
            user.avatar_url = picture or user.avatar_url
            if email_verified:
                user.email_verified = True
            user.save()
        
        # Log the user in
        login(request, user)
        
        # Check if user has an OrbitView profile
        try:
            profile = user.orbitview_profile
            has_profile = True
            profile_username = profile.username
        except OrbitViewProfile.DoesNotExist:
            has_profile = False
            profile_username = None
        
        return Response({
            'success': True,
            'user': {
                'id': str(user.id),
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'avatar_url': user.avatar_url,
                'email_verified': user.email_verified,
            },
            'created': created,
            'has_profile': has_profile,
            'profile_username': profile_username,
        }, status=status.HTTP_200_OK)
        
    except ValueError as e:
        # Invalid token
        return Response(
            {'error': f'Invalid Google token: {str(e)}'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': f'Authentication failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def _generate_username(email, name):
    """
    Generate a unique username from email or name.
    Falls back to email prefix if name is not available.
    """
    # Try to create username from name
    if name:
        # Convert name to slug format
        username_base = re.sub(r'[^a-z0-9]+', '', name.lower())
        if username_base:
            username = username_base
            # Ensure uniqueness
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{username_base}{counter}"
                counter += 1
            return username
    
    # Fall back to email prefix
    email_prefix = email.split('@')[0]
    username = re.sub(r'[^a-z0-9]+', '', email_prefix.lower())
    
    # Ensure uniqueness
    counter = 1
    original_username = username
    while User.objects.filter(username=username).exists():
        username = f"{original_username}{counter}"
        counter += 1
    
    return username


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user_view(request):
    """
    Get current authenticated user information.
    """
    try:
        profile = request.user.orbitview_profile
        has_profile = True
        profile_username = profile.username
    except OrbitViewProfile.DoesNotExist:
        has_profile = False
        profile_username = None
    
    return Response({
        'user': {
            'id': str(request.user.id),
            'email': request.user.email,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'avatar_url': request.user.avatar_url,
            'email_verified': request.user.email_verified,
        },
        'has_profile': has_profile,
        'profile_username': profile_username,
    })

groq_api_key = config("GROQ_API_KEY")
client = Groq(api_key=groq_api_key)

@api_view(['POST'])
@permission_classes([AllowAny])
def stream_groq(request):

    user_message = request.data.get("message")
    print(user_message)

    system_prompt = "You are a very helpful assistant"

    def stream():
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
            stream=True,
        )

        for chunk in response:
            delta = chunk.choices[0].delta
            content = delta.content if delta.content else None
            if content:
                # Flush the token to the client immediately
                yield content

    return StreamingHttpResponse(stream(), content_type="text/event-stream")