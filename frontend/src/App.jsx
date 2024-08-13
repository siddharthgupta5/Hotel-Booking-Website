
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HotelDetailsPage from './pages/HotelDetailsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import MyOrdersPage from './pages/MyOrdersPage.jsx';
import MyProfile from './pages/MyProfile.jsx';

function App() {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          }
        >
          <Route index element={<IndexPage searchQuery={searchQuery} />} />
          <Route path="/hotel/:id" element={<HotelDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Route>     
      </Routes>
    </div>
  );
}

export default App;
