import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CustomPage } from './pages/CustomPage';
import { DessertsPage } from './pages/DessertsPage';
import { CartPage } from './pages/CartPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'menu':
        return <MenuPage />;
      case 'custom':
        return <CustomPage />;
      case 'desserts':
        return <DessertsPage />;
      case 'cart':
        return <CartPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-teal-50">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {renderPage()}
      </div>
    </CartProvider>
  );
}

export default App;