# CarCar

Team:

* Person 1 - Christina - Service
* Person 2 - Which microservice?

## Design

## Service microservice

I created models for Technician, Appointment, and an AutomobileVO. My Technician model has attributes for tech_name and employee_number with the employee_number attribute set to unique. My Appointment model has attributes for customer_name, date, time, reason, vin, and tech_name which is a foreign key to my Technician model in order to be able to track which technician is assigned to a particular service appointment. Finally I created an AutomobileVO. I set up my poller to pull a copy of the vin data from the Automobile model which resides in the Inventory microservice. I decided to implement the filtering for whether a VIN in the list of appointments is a VIN from inventory on the front-end in React.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
