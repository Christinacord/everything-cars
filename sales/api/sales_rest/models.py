from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    # model = models.CharField(max_length=100)

class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)

class Employee(models.Model):
    name = models.CharField(max_length=200)
    employee_id = models.PositiveSmallIntegerField(unique=True)

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )

    employee = models.ForeignKey(
        Employee,
        related_name="sales",
        on_delete=models.CASCADE
    )

    price = models.IntegerField(max_length=50)


    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_sale", kwargs={"pk": self.pk})
