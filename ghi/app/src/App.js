import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './Manufacturers/ManufacturersList';
import ManufacturerCreate from './Manufacturers/ManufacturersCreate';
import InventoryList from './Inventory/InventoryList';
import InventoryForm from './Inventory/InventoryForm';
import VehicleModelForm from './VehicleModels/VehicleModelForm';
import VehicleModelsList from './VehicleModels/VehicleModelsList';



function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturers/new" element={<ManufacturerCreate />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/new" element={<InventoryForm />} />
          <Route path="/vehicle-models" element={<VehicleModelsList />} />
          <Route path="/vehicle-models/new/" element={<VehicleModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
