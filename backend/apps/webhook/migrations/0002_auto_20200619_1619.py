# Generated by Django 3.0.7 on 2020-06-19 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webhook', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='incomingmessage',
            name='destination',
        ),
        migrations.AddField(
            model_name='webhook',
            name='sqs_queue_url',
            field=models.URLField(null=True),
        ),
        migrations.AlterField(
            model_name='destination',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='incomingmessage',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='webhook',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
    ]
