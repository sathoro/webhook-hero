from rest_framework.permissions import BasePermission

from apps.core.utils import is_valid_uuid
from .models import AccountMember


class HasAccountPermissions(BasePermission):
    """
    This checks that the request has a valid Account ID associated with it through
    the X-WH-Account-ID header. If the authenticated user has access to the account,
    then the Account ID is saved on the request object and the request is permitted.
    Otherwise, the request will be rejected.
    """

    def has_permission(self, request, view):
        account_id = request.META.get("HTTP_X_WH_ACCOUNT_ID")

        if not is_valid_uuid(account_id):
            return False

        if not AccountMember.objects.filter(user_id=request.user.id, account_id=account_id).exists():
            return False

        request.account_id = account_id

        return True
