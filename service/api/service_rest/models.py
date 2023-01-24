from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)


class Technician(models.Model):
    tech_name = models.CharField(max_length=150)
    employee_number = models.PositiveSmallIntegerField(unique=True)


class Appointment(models.Model):
    customer_name = models.CharField(max_length=200)
    # vin = models.CharField(max_length=17, unique=True)
    date = models.DateTimeField()
    time = models.CharField(max_length=10)
    reason = models.TextField(max_length=500)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="appointments",
        on_delete=models.CASCADE,
    )

    tech_name = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,

    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.pk})
