from django.db import models


class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)


class ServiceAppointment(models.Model):
    vin = models.CharField(max_length=17)
    customer_name = models.CharField(max_length=100)
    appointment_date = models.DateTimeField()
    assigned_technician = models.ForeignKey(
        Technician,
        related_name="assigned_technician",
        on_delete=models.CASCADE
    )
    reason = models.CharField(max_length=500)
    isCompleted = models.BooleanField(default=False)
    # isVIP is set on create. See service_rest/api_views.py:99
    isVIP = models.BooleanField()


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
