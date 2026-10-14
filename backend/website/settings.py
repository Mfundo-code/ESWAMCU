"""
ESWAMCU website - LOCAL DEVELOPMENT settings.

Everything here is meant for running on your own computer
(http://localhost:8000 for the API, http://localhost:3000 for the site).
Nothing is configured for deployment yet - when you deploy, move the secret
key into an environment variable, set DEBUG = False, switch to PostgreSQL
and add the real domain to ALLOWED_HOSTS / CORS_ALLOWED_ORIGINS.
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------------
# SECURITY (local only)
# ------------------------------------------------------------------
SECRET_KEY = "local-dev-only-secret-key-do-not-use-in-production"
DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 3rd party
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    # the one app
    "core",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "website.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "website.wsgi.application"

# ------------------------------------------------------------------
# DATABASE - a single local SQLite file (db.sqlite3). No server needed.
# ------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    },
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Mbabane"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/django-static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "website.permissions.IsStaffOrReadOnly",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        # Token first: a missing/stale token then answers 401 (so the admin panel
        # sends you to the login page) instead of a confusing 403.
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    # Lists are paginated, but the client can ask for ?page_size=500 so the
    # admin panel and directories are never cut off at the first page.
    "DEFAULT_PAGINATION_CLASS": "website.pagination.StandardPagination",
    "PAGE_SIZE": 50,
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.MultiPartParser",
        "rest_framework.parsers.FormParser",
    ],
}

CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]

ADMIN_SITE_HEADER = "ESWAMCU Admin"
ADMIN_SITE_TITLE = "ESWAMCU Admin Portal"
ADMIN_INDEX_TITLE = "Welcome, Admin"