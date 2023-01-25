import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentsList from './Appointments';
import CreateAppointmentForm from './CreateAppointmentForm';
import TechnicianList from './Technician';
import CreateTechnicianForm from './CreateTechnicianForm';
import ServiceHistory from './ServiceHistory';
import Manufacturers from './Manufacturers';
import CreateManufacturerForm from './CreateManufacturerForm';


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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
