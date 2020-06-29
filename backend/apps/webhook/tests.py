from django.urls import reverse
from rest_framework import status, fields
from rest_framework.test import APITestCase
from botocore.stub import Stubber, ANY

from apps.core.testing import CreateAccountAPITestCaseMixin
from .models import Webhook, Destination
from .utils import get_boto_sqs_client


class WebhookViewSetTests(APITestCase, CreateAccountAPITestCaseMixin):
    def test_create_webhook_requires_logged_in(self):
        url = reverse("webhook-list")
        response = self.client.post(url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_webhook(self):
        user, account = self.create_account_and_login()

        url = reverse("webhook-list")
        data = {"name": "Foo"}

        response = self.client.post(url, data, **{"HTTP_X_WH_ACCOUNT_ID": str(account.id)})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(Webhook.objects.count(), 1)

        webhook = Webhook.objects.first()

        self.assertEqual(
            response.data,
            {
                "id": str(webhook.id),
                "name": webhook.name,
                "created_at": fields.DateTimeField().to_representation(webhook.created_at),
            },
        )


class DestinationViewSetTests(APITestCase, CreateAccountAPITestCaseMixin):
    def test_create_destination(self):
        user, account = self.create_account_and_login()

        webhook = Webhook.objects.create(name="Foo", account_id=account.id)

        url = reverse("destination-list")
        data = {"name": "Foo", "webhook": str(webhook.id)}

        with Stubber(get_boto_sqs_client()) as stubber:
            expected_create_queue_params = {
                "QueueName": ANY,
                "tags": {"CreatedByWebhookHero": "true", "DestinationName": "Foo", "WebhookName": "Foo"},
            }

            stubber.add_response("create_queue", {"QueueUrl": "foo"}, expected_create_queue_params)

            response = self.client.post(url, data, **{"HTTP_X_WH_ACCOUNT_ID": str(account.id)})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(Destination.objects.count(), 1)

        destination = Destination.objects.first()

        self.assertEqual(
            response.data,
            {
                "id": str(destination.id),
                "name": destination.name,
                "webhook": webhook.id,
                "sqs_queue_url": destination.sqs_queue_url,
                "created_at": fields.DateTimeField().to_representation(destination.created_at),
            },
        )
