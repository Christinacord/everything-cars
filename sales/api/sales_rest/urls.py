from django.urls import path
from .views import api_list_sales, api_show_sale, api_list_customers, api_show_customer, api_show_employee, api_sales_employees

urlpatterns = [
    path("sales/" , api_list_sales, name="api_list_sales"),
    path("sales/<int:pk>/", api_show_sale, name="api_show_shoe"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("employees/", api_sales_employees, name="api_list_employees"),
    path("employees/<int:pk>/", api_show_employee, name="api_show_employee"),
]
