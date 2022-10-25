from django.urls import path
from sales_rest.views import (
    api_list_potentialcustomers,
    api_show_potentialcustomer,
    api_list_salesrecords,
    api_show_salesrecord,
    api_list_salespersons,
    api_show_salesperson,
)

urlpatterns = [
    path('salesrecords/', api_list_salesrecords, name="api_list_salesrecords/"),
    path('salesrecords/<int:pk>/', api_show_salesrecord, name="api_show_salesrecord/"),
    path('salespersons/', api_list_salespersons, name="api_list_salespersons/"),
    path('salespersons/<int:pk>/', api_show_salesperson, name="api_show_salesperson/"),
    path('customers/', api_list_potentialcustomers, name="api_list_potentialcustomers/"),
    path('customers/<int:pk>/', api_show_potentialcustomer, name="api_show_potentialcustomer/"),
]
