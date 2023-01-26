from .models import Customer, Employee, Sale, AutomobileVO
from common.json import ModelEncoder

class AutomobileVoDetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = ["name", "address", "phone_number", "id"]

class EmployeeEncoder(ModelEncoder):
    model = Employee
    properties = ["name", "employee_id","pk"]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = ["automobile", "customer", "employee", "price", "id"]

    encoders = {
        "customer": CustomerEncoder(),
        "automobile": AutomobileVoDetailEncoder(),
        "employee": EmployeeEncoder(),
    }
    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin}
