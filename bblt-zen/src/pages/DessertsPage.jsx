import React from 'react';
import { useCart } from '../hooks/useCart';
import { desserts } from '../data/desserts';
import '../styles/DessertsPage.css';

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
    <div className="desserts-container">
      <h1 className="desserts-title">Dolci della Casa</h1>
      
      <div className="desserts-grid">
        {desserts.map(dessert => (
          <div key={dessert.id} className="dessert-card">
            <div className="dessert-image">
              <span className="dessert-emoji">🍰</span>
            </div>
            <div className="dessert-content">
              <h3 className="dessert-name">{dessert.name}</h3>
              <p className="dessert-description">{dessert.description}</p>
              <div className="dessert-footer">
                <span className="dessert-price">€{dessert.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(dessert)}
                  className="add-button"
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