from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('api/auth/google/', views.google_auth, name='google_auth'),
    path('api/auth/me/', views.current_user_view, name='current_user'),

    # An endpoint to test the streaming HTTP response in development
    path("stream-test/", views.stream_groq, name="stream_groq"),
]
