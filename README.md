# CarCar

Team:


* Tanner - Sales/Inventory
* Esteban -  Services/Inventory


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

Stop all services
Run docker container prune -f
Run docker volume rm beta-data
Run docker volume create beta-data
Run docker-compose up


Explain your models and integration with the inventory
microservice, here.

class AutmobileVO (will be used for servies too!!) (models.model):
    id
    vin

class SalesPerson(model.models)
-name
-employee ID

CreateNewSalesPerson.js

class Customer(models.model)
-name
-address
-phoneNumber

CreateCustomerForm.js

class SalesRecord(models.model)
-Automobile FK -AUTOMObile
-SALES_PERSON FK- SALESPERSON
-CUSTOMER FK - CUSTOMER
-sale_price

CreateSale.js
--------------------------------------------------------------------

ListSale.js
    sales persons name
    employee ID 
    Customers Name
    Autombole VIN
    Price of Sale

    (ADD TO NAV.BAR)

SalesPersonHistory.js
    sales person
    customer
    VIN
    sales price



     async function deleteManufacturers(manufacturers) {
       const response = await fetch(`http://localhost:8090/api/manufacturers/${manufacturers.id}/`, { method: "delete" })
       if (response.ok) {
         const idx = manufacturers.indexOf(manufacturers)
         const updated_manufacturers = [...manufacturers]
         updated_manufacturers.splice(idx, 1)
         setManufacturers(updated_manufacturers)
       }
     }
