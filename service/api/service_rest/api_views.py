from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Appointment, Technician
from django.http import JsonResponse
import json
from .encoders import AppointmentEncoder, TechnicianEncoder, AutomobileVOEncoder

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
             encoder=AppointmentEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            tech = content["tech_name"]
            tech_assigned = Technician.objects.get(employee_number=tech)
            content["tech_name"] = tech_assigned

            vin = content["vin"]
            existing_vin = AutomobileVO.objects.get(vin=vin)
            content["vin"] = existing_vin

            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )

        except:
            response = JsonResponse(
                {"message": "Could not create the appointment"},
            )
            response.status_code = 400
            return response
        
        
    
@require_http_methods(["DELETE", "GET"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
             encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
        )
        except:
            response = JsonResponse(
                {"message": "Could not create technician"}
            )
            response.status_code = 400
            return response
        

@require_http_methods(["GET", "DELETE"])
def api_show_technicians(request, pk):
    if request.method == "GET":
        try:
            tech_name = Technician.objects.get(id=pk)
            return JsonResponse(
                tech_name,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    else:
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
