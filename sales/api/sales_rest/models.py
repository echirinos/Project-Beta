from django.db import models

# Create your models here.

class AutomobilesVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.vin}"


class Salesperson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=12, unique=True)

    def __str__(self):
        return f"{self.name}"



class PotentialCustomer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=12)

    def __str__(self):
        return f"{self.name}"


class SalesRecord(models.Model):
    sale_price = models.IntegerField()
    salesperson = models.ForeignKey(Salesperson,related_name="sales_record", on_delete=models.PROTECT)
    customer = models.ForeignKey(PotentialCustomer, related_name="sales_record", on_delete=models.PROTECT)
    automobile = models.ForeignKey(AutomobilesVO, related_name="sales_record", on_delete=models.CASCADE)

