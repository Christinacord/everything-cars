# CarCar

Team:

* Person 1 - Christina - Service
* Person 2 - Kyle      - Sales

## Design

React/Boostrap/Django

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.


A Sales model was created to create sales records for the company.
On each Sales Record, we track:
- The Sales Person
- Customer Name
- VIN number
- Price of Vehicle
In order to retrieve which automobiles existed in the inventory, we had to communicate with the inventory microservice and grab the data for existing VINs aka poll for VINs.

An Employee model was created to represent the name and id of the Sales Person who contributed to the sale.
- Name of Sales Employee
- Employee ID

A Customer model was created to represent the information of Customer purchasing a vehicle.
- Name of Customer
- Address of Customer
- Phone Number of Customer
