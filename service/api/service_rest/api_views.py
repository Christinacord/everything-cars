from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician
from django.http import JsonResponse
import json


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

                               
class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "tech_name",
        "employee_number",
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "customer_name",
        "date",
        "time",
        "reason",
        "tech_name",
        "vin",
        "id",
    ]
    encoders = {
        "tech_name": TechnicianListEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
             encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            tech = content["tech_name"]
            tech_assigned = Technician.objects.get(employee_number=tech)
            content["tech_name"] = tech_assigned

            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )

        except Exception:
            return JsonResponse(
                {"message": "Could not create appointment"},
                 status=400,
            )
        
    
@require_http_methods(["DELETE", "GET"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
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
        

@require_http_methods(["GET", "DELETE"])
def api_show_technicians(request, pk):
    if request.method == "GET":
        tech_name = Technician.objects.get(id=pk)
        return JsonResponse(
            tech_name,
            encoder=TechnicianListEncoder,
            safe=False,
        )
    else:
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
