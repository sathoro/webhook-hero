from django.urls import reverse
from django.contrib.auth.hashers import check_password
from django.contrib.auth import SESSION_KEY
from rest_framework import status
from rest_framework.test import APITestCase

from apps.user.models import User


class RegisterTests(APITestCase):
    def test_create_account(self):
        url = reverse("register")
        data = {
            "email": "foo@bar.com",
            "first_name": "Foo",
            "last_name": "Bar",
            "password_1": "foo",
            "password_2": "foo",
        }

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertTrue(User.objects.filter(email="foo@bar.com", first_name="Foo", last_name="Bar").exists())

        user = User.objects.first()

        self.assertTrue(check_password("foo", user.password))
        self.assertEqual(response.data, {"id": str(user.id), "email": user.email})


class LoginTests(APITestCase):
    def test_login(self):
        user = User.objects.create_user("foo@bar.com", password="foo")

        url = reverse("login")
        data = {"email": user.email, "password": "foo"}
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {"id": str(user.id), "email": user.email})

        self.assertIn("csrftoken", self.client.cookies)
        self.assertIn("sessionid", self.client.cookies)
        self.assertEqual(self.client.session[SESSION_KEY], str(user.id))

    def test_wrong_password(self):
        user = User.objects.create_user("foo@bar.com", password="foo")

        url = reverse("login")
        data = {"email": user.email, "password": "bar"}
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LogoutTests(APITestCase):
    def test_logout(self):
        user = User.objects.create_user("foo@bar.com", password="foo")
        self.client.login(username=user.email, password="foo")

        url = reverse("logout")
        response = self.client.post(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.client.session.is_empty)


class CurrentUserTests(APITestCase):
    def test_get_current_user_info(self):
        user = User.objects.create_user("foo@bar.com", password="foo", first_name="Foo", last_name="Bar")
        self.client.login(username=user.email, password="foo")

        url = reverse("me")
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            {"id": str(user.id), "email": user.email, "first_name": user.first_name, "last_name": user.last_name},
        )

    def test_not_logged_in(self):
        url = reverse("me")
        response = self.client.get(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
