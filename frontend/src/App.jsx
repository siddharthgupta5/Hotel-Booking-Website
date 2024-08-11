import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HotelDetailsPage from './pages/HotelDetailsPage.jsx';
import Header from './Header.jsx';

function App() {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout searchQuery={searchQuery} />}>
          <Route index element={<IndexPage searchQuery={searchQuery} />} />
          <Route path="/hotel/:id" element={<HotelDetailsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>     
      </Routes>
    
    </div>
    
  );
}

export default App;
