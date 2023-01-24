import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SaleForm from './SaleForm'
import SalesList from './SalesList'
import InventoryList from './InventoryList'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory">
            <Route index element={<InventoryList/>} />
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
