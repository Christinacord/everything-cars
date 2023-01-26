from common.json import ModelEncoder 
from .models import AutomobileVO, Appointment, Technician

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
    ]

                               
class TechnicianEncoder(ModelEncoder):
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
        "tech_name": TechnicianEncoder(),
        
    }
