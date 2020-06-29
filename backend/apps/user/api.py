from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.conf import settings
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers

from apps.account.models import Account, AccountMember
from apps.account.api import AccountSerializer
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password_1", "password_2", "name", "account_name", "account_id"]

    email = serializers.CharField()
    password_1 = serializers.CharField(write_only=True)
    password_2 = serializers.CharField(write_only=True)
    account_name = serializers.CharField(write_only=True)
    account_id = serializers.CharField(read_only=True)

    def validate(self, data):
        if not settings.ALLOW_PUBLIC_REGISTRATION and User.objects.exists():
            raise serializers.ValidationError(
                "New users can't be created right now because ALLOW_PUBLIC_REGISTRATION is False and "
                "a user has already been registered. An existing user must add you to their account."
            )

        data = super().validate(data)

        if data["password_1"] != data["password_2"]:
            raise serializers.ValidationError("Passwords do not match")

        try:
            validate_password(data["password_1"])
        except ValidationError as e:
            raise serializers.ValidationError(e.messages[0])

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError("A user with that email already exists")

        return data

    def create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(
                validated_data["email"], validated_data["password_1"], name=validated_data["name"],
            )

            account = Account.objects.create(name=validated_data["account_name"])

            validated_data["account_id"] = account.id

            AccountMember.objects.create(user_id=user.id, account_id=account.id)

        validated_data["id"] = user.id

        login(self.context["request"], user)

        return validated_data


class Register(CreateAPIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = RegisterSerializer


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password"]

    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        data = super().validate(data)

        user = authenticate(self.context["request"], email=data["email"], password=data["password"])

        if user:
            data["user"] = user
            data["id"] = user.id
        else:
            raise serializers.ValidationError("Incorrect email or password")

        return data

    def create(self, validated_data):
        login(self.context["request"], validated_data["user"])

        return validated_data


class Login(CreateAPIView):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = LoginSerializer


class Logout(APIView):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request):
        logout(request)

        return Response()


class CurrentUserSerializer(serializers.ModelSerializer):
    accounts = AccountSerializer(many=True)

    class Meta:
        model = User
        fields = ["id", "email", "name", "accounts"]


class CurrentUser(RetrieveAPIView):
    serializer_class = CurrentUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
