from rest_framework.authentication import SessionAuthentication


class SessionAuthenticationDisableCSRF(SessionAuthentication):
    def enforce_csrf(self, request):
        return
