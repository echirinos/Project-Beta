import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


async function loadCars() {
  let manufacturerData, modelData, automobileData;
  const manufacturerResponse = await fetch('http://localhost:8100/api/manufacturers/');
  const modelResponse = await fetch('http://localhost:8100/api/models/');
  const automobileResponse = await fetch('http://localhost:8100/api/automobiles/');
  if (manufacturerResponse.ok) {
    manufacturerData = await manufacturerResponse.json();
  } else {
    console.error(manufacturerResponse);
  }
  if (modelResponse.ok) {
    modelData = await modelResponse.json();
  } else {
    console.error(modelResponse)
  }
  if (automobileResponse.ok) {
    automobileData = await automobileResponse.json();
  } else {
    console.error(automobileResponse)
  }
  let customerData, salesPeopleData, salesRecordsData;
  const customerResponse = await fetch('http://localhost:8090/api/customers/');
  const salesPeopleResponse = await fetch('http://localhost:8090/api/salespersons/');
  const salesRecordsResponse = await fetch('http://localhost:8090/api/salesrecords/');
  if (customerResponse.ok) {
    customerData = await customerResponse.json();
  } else {
    console.error(customerResponse)
  }
  if (salesPeopleResponse.ok) {
    salesPeopleData = await salesPeopleResponse.json();
  } else {
    console.error(salesPeopleResponse)
  }
  if (salesRecordsResponse.ok) {
    salesRecordsData = await salesRecordsResponse.json();
  } else {
    console.error(salesRecordsResponse)
  }
  // let appointmentData, technicianData;
  // const appointmentResponse = await fetch('http://localhost:8080/api/appointments/');
  // const technicianResponse = await fetch('http://localhost:8080/api/technicians/');
  // if (appointmentResponse.ok) {
  //   appointmentData = await appointmentResponse.json();
  // } else {
  //   console.error(appointmentResponse);
  // }
  // if (technicianResponse.ok) {
  //   technicianData = await technicianResponse.json();
  // } else {
  //   console.error(technicianResponse)
  // }

  root.render(
  <React.StrictMode>
    <App manufacturers={manufacturerData.manufacturers} models={modelData.models} automobiles={automobileData.autos} customers={customerData.customers} salesPeople={salesPeopleData.sales_people} salesRecords={salesRecordsData.sales_records} 
    />
  </React.StrictMode>
  );
}
loadCars();




