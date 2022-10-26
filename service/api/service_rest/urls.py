from django.urls import path

from .views import (
    api_technicians,
    api_technician_detail,
    api_appointments,
    api_appointment_detail,
)

urlpatterns = [
    path(
        "appointment/<int:pk>/",
        api_appointment_detail,
        name="api_appointments"
    ),
    path(
        "appointment/",
        api_appointments,
        name="api_appointments"
    ),
    path(
        "technician/",
        api_technicians,
        name="api_technicians"
    ),
    path(
        "technician/<int:employee_number>/",
        api_technician_detail,
        name="api_technician_detail"
    ),
]
