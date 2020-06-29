from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("apps.user.urls")),
    path("", include("apps.account.urls")),
    path("", include("apps.webhook.urls")),
]
