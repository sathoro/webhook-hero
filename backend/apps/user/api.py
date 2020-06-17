from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework import serializers

from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "password_1", "password_2", "first_name", "last_name"]

    email = serializers.CharField()
    password_1 = serializers.CharField(write_only=True)
    password_2 = serializers.CharField(write_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    def validate(self, data):
        data = super().validate(data)

        if data["password_1"] != data["password_2"]:
            raise serializers.ValidationError("Passwords do not match")

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError("A user with that email already exists")

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["email"],
            validated_data["password_1"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )

        validated_data["id"] = user.id

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
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]


class CurrentUser(RetrieveAPIView):
    serializer_class = CurrentUserSerializer

    def get_object(self):
        return self.request.user
