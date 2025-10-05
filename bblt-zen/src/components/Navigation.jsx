import React, { useState } from 'react';
import { Home, List, Wand2, Cookie, ShoppingCart, X, Menu } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import './Navigation.css';

export const Navigation = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: List },
    { id: 'custom', label: 'Crea', icon: Wand2 },
    { id: 'desserts', label: 'Dolci', icon: Cookie },
    { id: 'cart', label: 'Carrello', icon: ShoppingCart },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <div className="brand">
            <div className="logo"></div>
            <h1 className="brand-name">
              Bubble<span className="brand-highlight">Bliss</span>
            </h1>
          </div>

          <nav className="desktop-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.id === 'cart' && getTotalItems() > 0 && (
                  <span className="cart-badge">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.id === 'cart' && getTotalItems() > 0 && (
                  <span className="cart-badge">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};