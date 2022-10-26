import json
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobilesVO, SalesRecord, Salesperson, PotentialCustomer

# Create your views here.

class AutomobilesVOEncoder(ModelEncoder):
    model = AutomobilesVO
    properties = [
        "vin",
        "import_href",
        "id"
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employee_number",
        "id"
    ]

class PotentialCustomerEncoder(ModelEncoder):
    model = PotentialCustomer
    properties = [
        "name",
        "address",
        "phone",
        "id"
    ]

class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "sale_price",
        "id"
    ]
    encoders = {
        "automobile": AutomobilesVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": PotentialCustomerEncoder()
    }



@require_http_methods(["GET", "POST"])
def api_list_salesrecords(request):
    if request.method == "GET":
        salesrecord = SalesRecord.objects.all()
        return JsonResponse(
            {"salesrecords": salesrecord},
            encoder=SalesRecordEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            automobile_content = content["automobile"]
            automobile = AutomobilesVO.objects.get(vin=automobile_content)
            content["automobile"] = automobile


            salesperson = content["salesperson"]
            assigned_salesperson = Salesperson.objects.get(employee_number=salesperson)
            content["salesperson"] = assigned_salesperson

            customer = content["customer"]
            assgined_customer = PotentialCustomer.objects.get(phone=customer)
            content["customer"] = assgined_customer

        except AutomobilesVO.DoesNotExist:
            return JsonResponse(
                {"message": "Automobile does not exist"},
                status=400
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Salesperson does not exist"},
                status=400
            )
        except PotentialCustomer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400
            )

        salesrecords = SalesRecord.objects.create(**content)
        return JsonResponse(
            salesrecords,
            encoder=SalesRecordEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_salesrecord(request, pk):
    if request.method == "GET":
        salesrecord = SalesRecord.objects.filter(id=pk)
        return JsonResponse(
            salesrecord,
            encoder=SalesRecordEncoder,
            safe=False,
        )
    else:
        count, _ = SalesRecord.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET", "POST"])
def api_list_salespersons(request):
    if request.method == "GET":
        salespersons = Salesperson.objects.all()
        return JsonResponse(
            {"salespersons": salespersons},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        sales= Salesperson.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SalespersonEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def api_show_salesperson(request, pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.filter(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_potentialcustomers(request):
    if request.method == "GET":
        customer = PotentialCustomer.objects.all()
        return JsonResponse(
            {"customers": customer},
            encoder=PotentialCustomerEncoder
        )
    else:
        content = json.loads(request.body)
        customers = PotentialCustomer.objects.create(**content)
        return JsonResponse(
            customers,
            encoder=PotentialCustomerEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET"])
def api_show_potentialcustomer(request, pk):
    if request.method == "GET":
        customer = PotentialCustomer.objects.filter(id=pk)
        return JsonResponse(
            customer,
            encoder=PotentialCustomerEncoder,
            safe=False,
        )
    else:
        count, _ = PotentialCustomer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})