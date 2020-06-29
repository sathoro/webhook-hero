from django.urls import path

from .api import Login, Logout, Register, CurrentUser

urlpatterns = [
    path("api/v1/login", Login.as_view(), name="login"),
    path("api/v1/logout", Logout.as_view(), name="logout"),
    path("api/v1/register", Register.as_view(), name="register"),
    path("api/v1/me", CurrentUser.as_view(), name="me"),
]
