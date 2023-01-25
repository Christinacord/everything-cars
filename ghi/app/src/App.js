import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SaleForm from './sales/SaleForm'
import SalesList from './sales/SalesList'
import AutomobilesList from './inventory/automobiles/AutomobilesList'
import AutomobileForm from './inventory/automobiles/AutomobileForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="automobiles">
            <Route index element={<AutomobilesList/>} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SaleForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
