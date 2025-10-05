import React from 'react';
import { useCart } from '../hooks/useCart';
import { desserts } from '../data/desserts';

export const DessertsPage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (dessert) => {
    addToCart({
      id: dessert.id,
      name: dessert.name,
      price: dessert.price,
      quantity: 1,
      type: 'dessert'
    });
    alert(`${dessert.name} aggiunto al carrello!`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-pink-500 mb-8">Dolci della Casa</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {desserts.map(dessert => (
          <div key={dessert.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center">
              <span className="text-6xl">🍰</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{dessert.name}</h3>
              <p className="text-gray-600 mb-4">{dessert.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-pink-500">€{dessert.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(dessert)}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Aggiungi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};