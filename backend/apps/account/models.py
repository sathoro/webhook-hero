from django.db import models
from django.utils import timezone

from apps.core.models import UUIDModel


class Account(UUIDModel):
    name = models.TextField()
    created_at = models.DateTimeField(auto_now_add=timezone.now)


class AccountTeamMember(UUIDModel):
    class Meta:
        unique_together = ("account", "user")

    account = models.ForeignKey("account.Account", on_delete=models.CASCADE)
    user = models.ForeignKey("user.User", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=timezone.now)
