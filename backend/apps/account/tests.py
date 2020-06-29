from django.urls import reverse
from rest_framework import status, fields
from rest_framework.test import APITestCase

from apps.core.testing import CreateUserAPITestCaseMixin
from .models import Account, AccountMember


class AccountViewSetTests(APITestCase, CreateUserAPITestCaseMixin):
    def test_create_account_requires_logged_in(self):
        url = reverse("account-list")
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_account(self):
        user = self.create_user_and_login()

        url = reverse("account-list")
        data = {"name": "Foo"}

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(Account.objects.count(), 1)
        self.assertTrue(AccountMember.objects.count(), 1)

        account = Account.objects.first()
        account_member = AccountMember.objects.first()

        self.assertEqual(
            response.data,
            {
                "id": str(account.id),
                "name": account.name,
                "created_at": fields.DateTimeField().to_representation(account.created_at),
            },
        )

        self.assertEqual(account.name, "Foo")
        self.assertEqual(account_member.account_id, account.id)
        self.assertEqual(account_member.user_id, user.id)
