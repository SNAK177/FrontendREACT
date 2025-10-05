import React from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-3xl font-bold text-pink-500 mb-8">Il tuo Carrello</h1>
        <p className="text-xl text-gray-600 mb-8">Il carrello è vuoto</p>
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-8" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-pink-500 mb-8">Il tuo Carrello</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-8">
          {cart.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  {item.options && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Base: {item.options.base}</p>
                      <p>Bubble: {item.options.bubble}</p>
                      <p>Aroma: {item.options.aroma}</p>
                      <p>Dolcezza: {item.options.sweetness}%</p>
                      <p>Dimensione: {item.options.size}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <span className="text-xl font-bold text-pink-500">
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Totale:</span>
            <span className="text-3xl font-bold text-pink-500">€{getTotalPrice().toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              alert('Ordine confermato! Grazie per il tuo acquisto.');
              clearCart();
            }}
            className="w-full bg-pink-500 text-white py-4 rounded-lg text-lg font-bold hover:bg-pink-600 transition-colors mb-3"
          >
            Conferma Ordine
          </button>
          <button
            onClick={clearCart}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Svuota Carrello
          </button>
        </div>
      </div>
    </div>
  );
};