import React from 'react';

export const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-pink-200 to-teal-200 flex items-center justify-center">
        <span className="text-6xl">🧋</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-pink-500">
            €{product.priceL?.toFixed(2) || product.price?.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Aggiungi
          </button>
        </div>
      </div>
    </div>
  );
};