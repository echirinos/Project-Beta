# CarCar

Team:

* Person 1 - Which microservice?
* Person 2 - Which microservice?

## Design

Excalidraw Link: https://drive.google.com/file/d/1URAbxlryy4x5LMNdytwI2kfxbiUaDU0l/view?usp=sharing

## Service microservice

Explain your models and integration with the inventory
microservice, here.

- Technician: Created a form that allows a person to enter an automotive technician's name and employee number. When the form is submitted, the automotive technician is created in the application.
- ServiceAppointment: Created a form that allows a service concierge to enter the VIN of the vehicle, the name of the person to whom the vehicle belongs, the date and time of the appointment, the assigned technician, and a reason for the service appointment (like "oil change" or "routine maintenance"). As well as VIP statuses for individuals that the service microservice needs.
- AutomobileVO: Stores all automobiles that were ever in Inventory as value objects, including automobiles that have been sold
- Integration: The Service microservice has an appointment form to create a service. It also has a form to create a new technician with their name and employee number. The appointment form goes into a list where you can cancel the service appointment to get them off the list and complete the service appointment.





## Sales microservice

Explain your models and integration with the inventory
microservice, here.
