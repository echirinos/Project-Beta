from django.db import models

#creating technician model that will connect to services appointment
class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)

#creating service appointment model that will connect to services
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
    isVIP = models.BooleanField()

#creating automobile vo
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)
