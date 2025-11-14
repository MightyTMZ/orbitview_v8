from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('api/auth/google/', views.google_auth, name='google_auth'),
    path('api/auth/me/', views.current_user_view, name='current_user'),
]

