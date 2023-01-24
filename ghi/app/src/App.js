import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SaleForm from './SaleForm'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales">
            <Route path="new" element={<SaleForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
