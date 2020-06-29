from django.db import models
from django.contrib.postgres.fields import JSONField

from apps.core.models import UUIDModel, CreatedTimestampModel


class Webhook(UUIDModel, CreatedTimestampModel):
    account = models.ForeignKey("account.Account", on_delete=models.CASCADE)

    name = models.TextField()


class Destination(UUIDModel, CreatedTimestampModel):
    account = models.ForeignKey("account.Account", on_delete=models.CASCADE)
    webhook = models.ForeignKey("webhook.Webhook", on_delete=models.CASCADE, related_name="destinations")

    name = models.TextField()
    sqs_queue_url = models.URLField(null=True)


class IncomingMessage(UUIDModel, CreatedTimestampModel):
    account = models.ForeignKey("account.Account", on_delete=models.CASCADE)
    webhook = models.ForeignKey("webhook.Webhook", on_delete=models.CASCADE)

    method = models.TextField()
    headers = JSONField()
    query_params = JSONField()
    body = models.TextField()
