# CarCar

Team:

* Person 1 - Christina - Service
* Person 2 - Kyle      - Sales

## Design

React/Boostrap/Django

## Service microservice

I created models for Technician, Appointment, and an AutomobileVO. 

My Technician model was created to create an instance for each technician, and the list of those technicians will be available when creating a service appointment to assign a technician to an appointment. The Technician model has attributes for tech_name and employee_number with the employee_number attribute set to unique. 

My Appointment model was created in order to create an instance of the model for each service appointment.The Appointment model has attributes for customer_name, date, time, reason, vin, and tech_name. The tech_name attribute is a foreign key to my Technician model in order to be able to assign a technician to a service appointment and track which technician is assigned to a particular service appointment. 

Finally I created an AutomobileVO with a vin attribute. I set up my poller to pull a copy of the vin data from the Automobile model which resides in the Inventory microservice. I decided to implement the filtering for whether a VIN in the list of appointments is a VIN from inventory on the front-end in React in my AppointmentList component.

The api_list_appointments function is set up for either GET or POST requests to the http://localhost:8080/api/appointments/ endpoint. It facilitates either going and fetching the data for all appointments at that endpoint or allows a new appointment to be created and saved to the database. I created the AppointmentsList component to show the list of appointments on the front-end and the CreateAppointmentForm component to facilitate creating a new appointment.

The api_show_appointment function is set up for either a GET request to get a specific appointment or a DELETE request to delete a specific appointment at the http://localhost:8080/api/appointments/id/ endpoint.

The api_list_technicians function is set up to allow either a GET or POST request to the http://localhost:8080/api/technicians/ endpoint. A GET request here fetches and returns a list of all technicians, while a POST requests allows a single technician to be created and saved to the database. I created the TechnicianList component to show the list of technicians on the front end and the CreateTechnicianForm component in the front end to facilitate adding a new technician.

The api_show_technicians function is set up for either a GET request to get details about a specific technician or a DELETE request to delete a specific technician at the http://localhost:8080/api/technicians/id/.



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

