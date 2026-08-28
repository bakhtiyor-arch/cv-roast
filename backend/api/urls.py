from django.urls import path
from . import views

urlpatterns = [
    path("roast-cv", views.roast_cv, name="roast-cv"),
    path("health", views.health_check, name="health-check"),
]
