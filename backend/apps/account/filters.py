from rest_framework import filters


class ChildOfAccountFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        account_id = getattr(request, "account_id", None)

        if not account_id:
            return queryset.none()

        return queryset.filter(account_id=account_id)
