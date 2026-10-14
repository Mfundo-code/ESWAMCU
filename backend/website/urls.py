from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token

admin.site.site_header = settings.ADMIN_SITE_HEADER
admin.site.site_title = settings.ADMIN_SITE_TITLE
admin.site.index_title = settings.ADMIN_INDEX_TITLE

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("api/", include("core.urls")),
    path("api/auth/", include("rest_framework.urls")),
    path("api/auth/token/", obtain_auth_token, name="api-token-auth"),
]

# Uploaded files (PDFs, photos, logos) are served by Django while developing locally.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
