from functools import lru_cache

import boto3
from django.conf import settings
from django.utils.text import slugify


@lru_cache
def get_boto_sqs_client():
    return boto3.client(
        "sqs",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION_NAME,
    )


def create_sqs_queue(webhook_name, destination_name, destination_id):
    return get_boto_sqs_client().create_queue(
        QueueName=get_sqs_queue_name(webhook_name, destination_name, destination_id),
        tags={"CreatedByWebhookHero": "true", "WebhookName": webhook_name, "DestinationName": destination_name},
    )


def get_sqs_queue_name(webhook_name, destination_name, destination_id):
    return f"wh-{slugify(webhook_name)[:30]}-{slugify(destination_name)[:30]}-{destination_id[:8]}"
