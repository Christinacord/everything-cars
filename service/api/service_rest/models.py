from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)


class Technician(models.Model):
    tech_name = models.CharField(max_length=150)
    employee_number = models.CharField(max_length=50, unique=True)


class Appointment(models.Model):
    customer_name = models.CharField(max_length=200)
    vin = models.CharField(max_length=17, unique=True)
    date = models.DateField()
    time = models.TimeField()
    reason = models.TextField(max_length=500)

    technician = models.ForeignKey(
        Technician,
        related_name="appointment"
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"pk": self.pk})
