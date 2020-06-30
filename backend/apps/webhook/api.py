import uuid

from rest_framework import serializers, filters, viewsets, mixins
from django_filters.rest_framework import DjangoFilterBackend

from apps.account.filters import ChildOfAccountFilterBackend
from .models import Webhook, Destination, IncomingMessage
from .utils import create_sqs_queue


class WebhookPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        return Webhook.objects.filter(account_id=self.context["request"].account_id)


class DestinationSerializer(serializers.ModelSerializer):
    webhook = WebhookPrimaryKeyRelatedField()

    class Meta:
        model = Destination
        fields = ("id", "name", "webhook", "sqs_queue_url", "created_at")
        read_only = ["sqs_queue_url"]


class DestinationViewSet(viewsets.ModelViewSet):
    serializer_class = DestinationSerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend, ChildOfAccountFilterBackend]
    filterset_fields = ["webhook"]
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]
    queryset = Destination.objects

    def perform_create(self, serializer):
        webhook = serializer.validated_data["webhook"]

        # manually generate a uuid so we can use it as part of the SQS queue name
        destination_id = uuid.uuid4()

        queue = create_sqs_queue(webhook.name, serializer.validated_data["name"], str(destination_id))

        serializer.save(id=destination_id, account_id=self.request.account_id, sqs_queue_url=queue["QueueUrl"])


class WebhookNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webhook
        fields = ("id", "name")


class WebhookSerializer(serializers.ModelSerializer):
    destinations = DestinationSerializer(many=True, read_only=True)

    class Meta:
        model = Webhook
        fields = ("id", "name", "created_at", "destinations")


class WebhookViewSet(viewsets.ModelViewSet):
    serializer_class = WebhookSerializer
    filter_backends = [filters.OrderingFilter, ChildOfAccountFilterBackend]
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]
    queryset = Webhook.objects

    def perform_create(self, serializer):
        serializer.save(account_id=self.request.account_id)


class IncomingMessageSerializer(serializers.ModelSerializer):
    webhook = WebhookNameSerializer()

    class Meta:
        model = IncomingMessage
        fields = ("id", "webhook", "method", "headers", "query_params", "body", "created_at", "webhook")


class IncomingMessageViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = IncomingMessageSerializer
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend, ChildOfAccountFilterBackend]
    filterset_fields = ["webhook"]
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]
    queryset = IncomingMessage.objects.select_related("webhook")

    def perform_create(self, serializer):
        serializer.save(account_id=self.request.account_id)
