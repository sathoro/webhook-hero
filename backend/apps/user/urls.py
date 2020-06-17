from django.urls import path

from .api import Login, Logout, Register, CurrentUser

urlpatterns = [
    path("login", Login.as_view(), name="login"),
    path("logout", Logout.as_view(), name="logout"),
    path("register", Register.as_view(), name="register"),
    path("me", CurrentUser.as_view(), name="me"),
]
