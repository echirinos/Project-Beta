# CarCar

Team:

* Tanner - Sales/Inventory
* Esteban -  Services/Inventory

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.



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