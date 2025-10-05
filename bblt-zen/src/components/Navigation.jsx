import React, { useState } from 'react';
import { Home, List, Wand2, Cookie, ShoppingCart, X, Menu } from 'lucide-react';
import { useCart } from '../hooks/useCart';

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
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-teal-400 rounded-full"></div>
            <h1 className="text-2xl font-bold text-gray-800">
              Bubble<span className="text-pink-500">Bliss</span>
            </h1>
          </div>

          <nav className="hidden md:flex gap-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id 
                    ? 'text-pink-500 bg-pink-50' 
                    : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.id === 'cart' && getTotalItems() > 0 && (
                  <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === item.id 
                    ? 'text-pink-500 bg-pink-50' 
                    : 'text-gray-700'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.id === 'cart' && getTotalItems() > 0 && (
                  <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
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