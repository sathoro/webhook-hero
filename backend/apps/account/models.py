from django.db import models

from apps.core.models import UUIDModel, CreatedTimestampModel


class Account(UUIDModel, CreatedTimestampModel):
    name = models.TextField()


class AccountMember(UUIDModel, CreatedTimestampModel):
    class Meta:
        unique_together = ("account", "user")

    account = models.ForeignKey("account.Account", on_delete=models.CASCADE)
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
