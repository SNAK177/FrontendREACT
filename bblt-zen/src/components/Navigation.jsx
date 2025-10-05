import React, { useState } from 'react';
import { Home, List, Wand2, Cookie, ShoppingCart, X, Menu } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation(); // per evidenziare pagina attiva

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/menu', label: 'Menu', icon: List },
    { path: '/custom', label: 'Crea', icon: Wand2 },
    { path: '/desserts', label: 'Dolci', icon: Cookie },
    { path: '/cart', label: 'Carrello', icon: ShoppingCart },
  ];

  return (
    <header className="header">
      <div className="container">
        {/* Brand */}
        <div className="brand">
          <h1 className="brand-name">
            Bubble<span className="brand-highlight">Bliss</span>
          </h1>
        </div>

        {/* Desktop Navbar */}
        <nav className="desktop-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {item.path === '/cart' && getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-button"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navbar */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {item.path === '/cart' && getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
