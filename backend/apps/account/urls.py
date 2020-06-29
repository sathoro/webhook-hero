from rest_framework import routers

from .api import AccountViewSet


router = routers.SimpleRouter(trailing_slash=False)
router.register(r"api/v1/account", AccountViewSet, "account")

urlpatterns = router.urls
