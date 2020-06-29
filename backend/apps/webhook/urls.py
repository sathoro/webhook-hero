from django.urls import path
from rest_framework import routers

from .api import WebhookViewSet, DestinationViewSet, IncomingMessageViewSet
from .ingest import ingest_view


router = routers.SimpleRouter(trailing_slash=False)
router.register(r"api/v1/webhook", WebhookViewSet, "webhook")
router.register(r"api/v1/destination", DestinationViewSet, "destination")
router.register(r"api/v1/incoming-message", IncomingMessageViewSet, "incoming-message")

urlpatterns = router.urls + [
    path("ingest/<uuid:webhook_id>", ingest_view, name="ingest"),
]
