import logging
import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "django-insecure-dev-key-change-in-production")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "api",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

CORS_ALLOW_ALL_ORIGINS = DEBUG
CORS_ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "CORS_ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if o.strip()
]

ROOT_URLCONF = "roaster.urls"
WSGI_APPLICATION = "roaster.wsgi.application"

DATABASES = {}

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
    ],
    "DEFAULT_PARSER_CLASSES": [
        "rest_framework.parsers.MultiPartParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.JSONParser",
    ],
    "EXCEPTION_HANDLER": "api.views.custom_exception_handler",
}

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Tashkent"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip().strip("'").strip('"')
GROQ_MODEL = os.getenv("GROQ_MODEL", "qwen/qwen3.8-27b")

# --- Startup diagnostic: masked API key preview ---
_logger = logging.getLogger("roaster.startup")
if GROQ_API_KEY:
    masked = GROQ_API_KEY[:6] + "..." + GROQ_API_KEY[-4:] if len(GROQ_API_KEY) > 10 else "***"
    _logger.warning("GROQ_API_KEY loaded: %s", masked)
else:
    _logger.error("GROQ_API_KEY NOT FOUND in environment. Set it in backend/.env")

CV_FILE_MAX_SIZE_MB = int(os.getenv("CV_FILE_MAX_SIZE_MB", "5"))
CV_FILE_MIN_TEXT_LENGTH = int(os.getenv("CV_FILE_MIN_TEXT_LENGTH", "50"))
