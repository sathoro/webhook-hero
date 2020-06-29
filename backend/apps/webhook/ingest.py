from uuid import uuid4

from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes
from rest_framework.parsers import JSONParser, FormParser
from django.shortcuts import get_object_or_404

from .response.default import DefaultResponse
from .response.base import ResponseRegistry
from .models import Webhook
from .tasks import persist_incoming_message


def get_http_response(request):
    for response in ResponseRegistry.responses:
        if response.should_apply(request):
            return response.get_http_response(request)

    return DefaultResponse.get_http_response(request)


@api_view(["GET", "POST", "PUT", "PATCH"])
@authentication_classes([])
@permission_classes([])
@parser_classes([JSONParser, FormParser])
def ingest_view(request, webhook_id):
    webhook = get_object_or_404(Webhook, id=webhook_id)

    persist_incoming_message.delay(
        {
            "id": str(uuid4()),
            "webhook_id": str(webhook.id),
            "account_id": str(webhook.account_id),
            "method": request.method,
            "headers": dict(request.headers),
            "query_params": request.query_params,
            "body": request.data,
        },
    )

    return get_http_response(request)
