# CarBook
![Logo](https://easydrawingguides.com/wp-content/uploads/2017/01/How-to-Draw-a-cartoon-car-20.png)


**An Interactive web application that Automobile Dealership's could use to manage inventory, record sales,
record services, add potential customers, add technicians, and create appointments.**

## Getting Started/ Installing

1. Open your terminal and go into your preferred directory 

```
cd <DIRECTORYNAME>
```

2. go to [this link](https://gitlab.com/tannerhalsey/project-beta.git) and click the blue clone
button to copy with HTTPS

```
git clone https://gitlab.com/tannerhalsey/project-beta.git
```

3. Make sure Docker is [installed](https://www.docker.com/)

4.  CD into your new project-beta directory
```
cd project-beta
```

5.  Run these commands in the following order in your terminal:
``` 
docker volume create beta-data
docker-compose build
docker-compose up
```

6.  Make sure your docker desktop looks like [this](https://drive.google.com/file/d/16Mf0BLF5FZMxVGXA-rUkZNqU9ok-igFL/view) if not all your docker containers are running
make sure you're using the most recent version of Python, and refer back to the error message.

7. Go to your browser and go to [localhost:3000](localhost:3000) 

8. Congratulations you have successfully booted up CarBook, enjoy! 

### Prerequisites

What you need to install the software and how to install them
[Python](https://www.python.org/downloads/)


```
pip install docker
```

## Deployment

**If a page isn't loading for you, make sure you run   `pip install -r requirements.txt`   for that specific directory in your terminal**

These are additional things you made need: 
*IDE
*Python
*Docker

## Built With

* [Django](https://docs.djangoproject.com/en/4.1/) - The web framework used
* [React](https://maven.apache.org/) - Building user interfaces Front-End
* [Python](https://www.python.org/doc/) - Back-End

## Contributing

Please reach out to Esteban or Tanner for alternate use.

## Authors

Team:
* Tanner Halsey - Inventory/ Sales API
* Esteban Chirinois - Inventory/ Services API

See also the list of [contributors](https://gitlab.com/tannerhalsey/project-beta/-/project_members) who participated in this project.

## License

This project is licensed under the Tanner&Esteban License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* HackReactor, SEIRS

______________________________________________________________

## Design

Our [Excalidraw](https://drive.google.com/file/d/1URAbxlryy4x5LMNdytwI2kfxbiUaDU0l/view?usp=sharing) 
shows the DOM and aggregate/aggregate root.

## Service microservice

Technician: Created a form that allows a person to enter an automotive technician's name and employee number. When the form is submitted, the automotive technician is created in the application.
ServiceAppointment: Created a form that allows a service concierge to enter the VIN of the vehicle, the name of the person to whom the vehicle belongs, the date and time of the appointment, the assigned technician, and a reason for the service appointment (like "oil change" or "routine maintenance"). As well as VIP statuses for individuals that the service microservice needs.
AutomobileVO: Stores all automobiles that were ever in Inventory as value objects, including automobiles that have been sold
Integration: The Service microservice has an appointment form to create a service. It also has a form to create a new technician with their name and employee number. The appointment form goes into a list where you can cancel the service appointment to get them off the list and complete the service appointment.

## Sales microservice

React Forms Broken into folders:

*Inventory
    -InventoryForm
    -InventoryList

*Manufacturers
    -ManufacturersCreate
    -ManufacturersList

*Sales
    -CreateCustomer
    -CreateSalesRecord
    -CreateSalesperson
    -ListSalesHistory
    -SalesList

*Services
    *ServiceAppointment
        -AppointmentForm
        -AppointmentHistory
        -AppointmentList
    *Technicians
        -TechnicianForm

*VehicleModels
    -VehicleModelForm
    -VehicleModelList

Models--

*Autombile* will be **Value Object** since used in other apps.

SalesPerson model contains employee w/ charfield and number in a positive big interger field. 
Employee represents the name of employee with unique set to true to prevent duplicates. 
employee_id would be the id associated with the employee.
The AutomobileVO model is how my sales microservice will be *integrated* with the inventory microserice. A poller is used to obtain the **vin number from Automobile model in inventory**. AutomobileVO is imported into the poller and used in the get_automobiles function to poll for the data in Automobile in the inventory microservice. AutomobileVO includes the import_href, color, year, vin, and a sold property that will be used in the view to indicate if an automobile was sold. If sold is True, then the automobile cannot be sold again and will *not* be available for another sale record.
The Customer model has name for the customer name in a charfield and phone as the customer's phone number as a charfield that will also be a unique identifier for a customer as every phone number is unique to a customer.
The Sales model has price as a float field to enter in a dolar amount. The Sales model has foreign keys to AutomobileVO to get the vin, Customer to get the customer name, and SalesPerson to obtain the Salesperson.

