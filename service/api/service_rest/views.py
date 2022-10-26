from django.shortcuts import render
import json

from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "name",
        "employee_number"
    ]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "id",
        "vin",
        "customer_name",
        "appointment_date",
        "assigned_technician",
        "reason",
        "isCompleted",
        "isVIP"
    ]
    encoders = {
        "assigned_technician": TechnicianEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            new_technician = Technician.objects.create(**content)
            return JsonResponse(
                new_technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except IntegrityError:
            return JsonResponse(
                {"message": "Employee with same number already exists."},
                status=409
            )
        except:
            return JsonResponse(
                {"message": "Could not create employee."},
                status=500
            )


@require_http_methods("GET")
def api_technician_detail(request, employee_number):
    try:
        technician = Technician.objects.get(employee_number=employee_number)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
    except Technician.DoesNotExist:
        return JsonResponse(
            {"message": "Technician with that employee number does not exist"},
            status=404
        )


@require_http_methods(["GET", "POST"])
def api_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder
        )
    else:
        content = json.loads(request.body)
        technician_number = content["assigned_technician"]
        vin = content["vin"]

        assigned_technician = Technician.objects.get(employee_number=technician_number)
        content["assigned_technician"] = assigned_technician

        # AutomobileVO will store all cars that were _ever_ in
        # inventory, as the poller uses
        # AutomobileVO.objects.update_or_create()
        # and doesn't delete its own automobile when one is deleted
        # in the Inventory service.
        # This is intentional because it makes determining appointment
        # VIP status straightforward.
        try:
            vin_in_inventory = AutomobileVO.objects.get(vin=vin)
        except AutomobileVO.DoesNotExist:
            vin_in_inventory = None

        if vin_in_inventory:
            content["isVIP"] = True
        else:
            content["isVIP"] = False
        new_appointment = ServiceAppointment.objects.create(**content)

        return JsonResponse(
            new_appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_appointment_detail(request, pk):
    if request.method == "GET":
        try:
            appointment = ServiceAppointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {"message": f"Appointment with id {pk} does not exist"},
                status=404
            )

    elif request.method == "PUT":
        # Update only concerned with toggling isCompleted
        content = json.loads(request.body)
        try:
            appointment = ServiceAppointment.objects.get(id=pk)

            setattr(appointment, "isCompleted", content["isCompleted"])
            appointment.save()
            return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {"message": f"Appointment with id {pk} does not exist"},
                status=404
            )
    else:
        try:
            count, _ = ServiceAppointment.objects.get(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except ServiceAppointment.DoesNotExist:
            return JsonResponse(
                {"message": f"Appointment with id {pk} does not exist"},
                status=404
            )
