from dataclasses import dataclass

from django.http import HttpResponse


@dataclass
class ResponseInfo:
    status: int = 200
    content: str = ""
    headers: dict = None
    content_type: str = "text/html; charset=utf-8"


class ResponseRegistry:
    responses = []

    @classmethod
    def register_response(cls, response_cls):
        cls.responses.append(response_cls)


class MetaResponse(type):
    def __init__(cls, name, bases, dct):
        if not getattr(cls, "base"):
            ResponseRegistry.register_response(cls)


class BaseResponse(metaclass=MetaResponse):
    base = True

    @staticmethod
    def should_apply(request):
        raise NotImplementedError()

    @staticmethod
    def get_info(request):
        raise NotImplementedError()

    @classmethod
    def get_http_response(cls, request):
        response_info = cls.get_info(request)

        response = HttpResponse(
            status=response_info.status, content=response_info.content, content_type=response_info.content_type
        )

        if response_info.headers:
            for header_name, header_value in response_info.headers.items():
                response[header_name] = header_value

        return response
