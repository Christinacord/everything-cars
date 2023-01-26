import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SaleForm from './sales/SaleForm'
import SalesList from './sales/SalesList'
import AutomobilesList from './inventory/automobiles/AutomobilesList'
import AutomobileForm from './inventory/automobiles/AutomobileForm';
import CustomerForm from './sales/CustomerForm';
import SalesPersonForm from './sales/SalesPersonForm';
import VehicleModelForm from './inventory/vehicle_models/VehicleModelForm';
import AppointmentsList from './Appointments/Appointments';
import CreateAppointmentForm from './Appointments/CreateAppointmentForm';
import TechnicianList from './Technicians/Technician';
import CreateTechnicianForm from './Technicians/CreateTechnicianForm';
import ServiceHistory from './Appointments/ServiceHistory';
import Manufacturers from './inventory/manufacturers/Manufacturers';
import CreateManufacturerForm from './inventory/manufacturers/CreateManufacturerForm';
import VehicleModels from './inventory/vehicle_models/VehicleModels';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/appointments">
            <Route path="new" element={<CreateAppointmentForm />} />
            <Route index element={<AppointmentsList />} />
          </Route>

          <Route path="/technicians">
            <Route path="new" element={<CreateTechnicianForm />} />
            <Route index element={<TechnicianList />} />
          </Route>

          <Route path="/history" element={<ServiceHistory />} />

          <Route path="/manufacturers">
            <Route path="new" element={<CreateManufacturerForm />} />
            <Route index element={<Manufacturers />} />
          </Route>

          <Route path="automobiles">
            <Route index element={<AutomobilesList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>

          <Route path="vehicles">
            <Route index element={<VehicleModels />} />
            <Route path="new" element={<VehicleModelForm />} />
          </Route>

          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SaleForm />} />
          </Route>

          <Route path="/employees/new" element={<SalesPersonForm />} />
          <Route path="/customers/new" element={<CustomerForm />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
