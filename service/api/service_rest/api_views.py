from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician
from django.http import JsonResponse
import json


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "customer_name",
        "vin",
        "date",
        "time",
        "reason",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
    }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "customer_name",
        "vin",
        "date",
        "time",
        "reason",
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
    }
                               
class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "tech_name",
        "employee_number",
    ]


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
             encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        # try:
        tech = content["tech_name"]
        tech_assigned = Technician.objects.get(tech_name=tech)
        content["tech_name"] = tech_assigned
        # except TechnicianListEncoder.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "Invalid technician"},
        #          status=400,
        #     )
        
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    
@require_http_methods(["DELETE", "GET"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
             encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False,
        )
        except Exception:
            return JsonResponse(
                {"message": "Error creating technician. Could not create technician."},
                 status=400,
            )
