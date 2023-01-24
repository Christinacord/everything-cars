from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import Customer, Employee, Sale, AutomobileVO
from common.json import ModelEncoder
import json
from django.http import JsonResponse

# Create your views here.

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
    properties = ["automobile", "customer", "employee", "price","id"]

    encoders = {
        "customer": CustomerEncoder(),
        "automobile": AutomobileVoDetailEncoder(),
        "employee": EmployeeEncoder(),
    }
    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin}

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = automobile

            employee_ID = content["employee"]
            employee = Employee.objects.get(employee_id=employee_ID)
            content["employee"] = employee

            id = content["customer"]
            customer = Customer.objects.get(pk=id)
            content["customer"] = customer

            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False
            )
        except Exception:
            return JsonResponse(
                {"message": "Could not create sale"},
                status=400
            )


@require_http_methods(["GET", "DELETE"])
def api_show_sale(request, pk):
    if request.method == "GET":
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
    else:
        count, _ = Sale.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET","POST"])
def api_list_customers(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customers": customer},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content=json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Exception:
            return JsonResponse(
                {"message": "Could not create customer"},
                status=400
            )

@require_http_methods(["GET","DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400
            )
    else:
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Customer does not exist"},
                status=400
            )

@require_http_methods(["GET", "POST"])
def api_sales_employees(request):
    if request.method == "GET":
        employee = Employee.objects.all()
        return JsonResponse(
            {"employees": employee},
            encoder=EmployeeEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            employee = Employee.objects.create(**content)
            return JsonResponse(
                employee,
                encoder=EmployeeEncoder,
                safe=False
            )
        except Exception:
            return JsonResponse(
                {"message": "Could not create Employee"},
                status_code=400
            )
@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_employee(request, pk):
    if request.method == "GET":
        try:
            employee = Employee.objects.get(id=pk)
            return JsonResponse(
                employee,
                encoder=EmployeeEncoder,
                safe=False
            )
        except Employee.DoesNotExist:
            return JsonResponse(
                {"message": "Employee does not exist"},
                status=404
            )
    elif request.method == "DELETE":
        try:
            employee = Employee.objects.get(id=pk)
            employee.delete()
            return JsonResponse(
                employee,
                encoder=EmployeeEncoder,
                safe=False
            )
        except Employee.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=404
            )
    else:
        try:
            content = json.loads(request.body)
            employee = Employee.objects.get(id=pk)
            employee.name = content["name"]
            employee.save()
            return JsonResponse(
                employee,
                encoder=EmployeeEncoder,
                safe=False
            )
        except Employee.DoesNotExist:
            return JsonResponse(
                {"message": "Does not exist"},
                status=400
            )
