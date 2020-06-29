from .base import BaseResponse, ResponseInfo


class DefaultResponse(BaseResponse):
    @staticmethod
    def should_apply(request):
        return True

    @staticmethod
    def get_info(request):
        return ResponseInfo()
