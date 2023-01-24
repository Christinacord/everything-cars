import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AppointmentsList from './Appointments';
import CreateAppointmentForm from './CreateAppointmentForm';


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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
