from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import AutomobilesVO, Salesperson, SalesRecord, PotentialCustomer


admin.site.register(AutomobilesVO)
admin.site.register(Salesperson)
admin.site.register(SalesRecord)
admin.site.register(PotentialCustomer)
