from rest_framework import serializers, permissions, filters, viewsets
from django.db import transaction

from .models import Account, AccountMember


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ("id", "name", "created_at")


class AccountFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(accountmember__user_id=request.user.id)


class AccountPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if view.action in ["retrieve", "update", "partial_update", "destroy"]:
            return AccountMember.objects.filter(account_id=obj.id, user_id=request.user.id).exists()

        return True


class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    filter_backends = [AccountFilterBackend]
    permission_classes = [permissions.IsAuthenticated, AccountPermission]
    queryset = Account.objects

    def perform_create(self, serializer):
        with transaction.atomic():
            account = serializer.save()

            AccountMember.objects.create(user_id=self.request.user.id, account_id=account.id)
