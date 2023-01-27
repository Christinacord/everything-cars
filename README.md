# CarCar

Team:

* Person 1 - Christina - Service
* Person 2 - Kyle      - Sales

## Design

React/Boostrap/Django

## Service microservice

I created models for Technician, Appointment, and an AutomobileVO. My Technician model has attributes for tech_name and employee_number with the employee_number attribute set to unique. My Appointment model has attributes for customer_name, date, time, reason, vin, and tech_name which is a foreign key to my Technician model in order to be able to track which technician is assigned to a particular service appointment. Finally I created an AutomobileVO. I set up my poller to pull a copy of the vin data from the Automobile model which resides in the Inventory microservice. I decided to implement the filtering for whether a VIN in the list of appointments is a VIN from inventory on the front-end in React.

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

In this project we used view functions that takes web requests from the server and returns a web response.
POST view functions for:
 - Creating a Sales Record
 - Creating a Sales Employee
 - Creating a Customer
GET view functions for:
 - Listing all Sales Records

