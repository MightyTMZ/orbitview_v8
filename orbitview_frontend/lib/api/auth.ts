const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export interface GoogleAuthResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    email_verified: boolean;
  };
  created: boolean;
  has_profile: boolean;
  profile_username: string | null;
}

export interface AuthError {
  error: string;
}

export async function authenticateWithGoogle(token: string): Promise<GoogleAuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/google/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for session cookies
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const error: AuthError = await response.json();
    throw new Error(error.error || 'Authentication failed');
  }

  return response.json();
}

export async function getCurrentUser(): Promise<GoogleAuthResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me/`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

