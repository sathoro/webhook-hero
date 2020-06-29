from celery import shared_task
import json
from psycopg2 import errorcodes as pg_errorcodes
from django.db import IntegrityError

from .utils import get_boto_sqs_client
from .models import IncomingMessage, Destination


@shared_task
def persist_incoming_message(incoming_message_info):
    """
    This task is safe to retry because it is idempotent. The only possibility
    of duplication is when it comes to sending the message to SQS. In practice that is not
    a problem, however, since SQS itself will sometimes deliver messages more than once. So
    regardless it is a best practice for the SQS consumer to verify they have not already
    processed the message using the unique message`id`. This could automatically be alleviated by
    using a SQS FIFO queue since those support deduplication by a unique id.

    If for any reason this task is called more than once for the same
    incoming message then inserting in Postgres will fail due to a duplicate id.
    When that happens we still continue because it is possible
    that on previous task invocations the message was not actually
    passed to SQS.
    """

    try:
        IncomingMessage.objects.create(**incoming_message_info)
    except IntegrityError as e:
        """
        This just verifies the cause of the exception was a duplicate `id` key.
        If that was not the cause of the exception then it was not an "expected"
        error and should be re-raised and dealt with.
        """

        if not (
            e.__cause__.pgcode == pg_errorcodes.UNIQUE_VIOLATION
            and e.__cause__.diag.constraint_name == "webhook_incomingmessage_pkey"
        ):
            raise

    incoming_message_info_json = json.dumps(incoming_message_info)

    for destination in Destination.objects.filter(webhook_id=incoming_message_info["webhook_id"]).values(
        "sqs_queue_url"
    ):
        send_message_to_sqs.delay(destination["sqs_queue_url"], incoming_message_info_json)


@shared_task
def send_message_to_sqs(sqs_queue_url, message_body):
    get_boto_sqs_client().send_message(
        MessageBody=message_body, QueueUrl=sqs_queue_url,
    )
