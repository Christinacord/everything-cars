from django.urls import path
from .api_views import api_list_appointments, api_show_appointment, api_list_technicians

urlpatterns = [
    path("appointments/", api_list_appointments, name="api_create_appointments"),
    path("appointments/<int:pk>/", api_show_appointment, name="api_show_appointment"),
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("automobiles/<int:pk>/appointments/", api_list_appointments, name="api_list_appointment"),
]
