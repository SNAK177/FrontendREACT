import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { customOptions } from '../data/customOptions';

export const CustomPage = () => {
  const { addToCart } = useCart();
  const [selections, setSelections] = useState({
    base: 'Tè nero con latte',
    bubble: 'Tapioca classica',
    aroma: 'Vaniglia',
    sweetness: 50,
    ice: false,
    size: 'L',
    quantity: 1
  });

  const { bases, bubbles, aromas } = customOptions;
  const getPrice = () => selections.size === 'M' ? 4.50 : 5.50;

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      name: 'Bubble Tea Personalizzato',
      price: getPrice(),
      quantity: selections.quantity,
      options: selections
    });
    alert('Bevanda personalizzata aggiunta al carrello!');
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <h1 className="text-3xl font-bold text-pink-500 mb-8">Crea il tuo Bubble Tea</h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6 p-4 bg-gray-100 rounded-lg flex justify-around">
          <p className="font-bold">Prezzo M: €4.50</p>
          <p className="font-bold">Prezzo L: €5.50</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-3">Base</h3>
            <div className="grid grid-cols-2 gap-3">
              {bases.map(base => (
                <button
                  key={base}
                  onClick={() => setSelections({...selections, base})}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selections.base === base 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {base}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Bubble</h3>
            <div className="grid grid-cols-2 gap-3">
              {bubbles.map(bubble => (
                <button
                  key={bubble}
                  onClick={() => setSelections({...selections, bubble})}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selections.bubble === bubble 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {bubble}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Aroma</h3>
            <div className="grid grid-cols-2 gap-3">
              {aromas.map(aroma => (
                <button
                  key={aroma}
                  onClick={() => setSelections({...selections, aroma})}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selections.aroma === aroma 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {aroma}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Dolcezza: {selections.sweetness}%</h3>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={selections.sweetness}
              onChange={(e) => setSelections({...selections, sweetness: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="ice"
              checked={selections.ice}
              onChange={(e) => setSelections({...selections, ice: e.target.checked})}
              className="w-5 h-5"
            />
            <label htmlFor="ice" className="font-bold">Aggiungi ghiaccio</label>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Dimensione</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value="M"
                  checked={selections.size === 'M'}
                  onChange={(e) => setSelections({...selections, size: e.target.value})}
                />
                <span>Medio (M)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  value="L"
                  checked={selections.size === 'L'}
                  onChange={(e) => setSelections({...selections, size: e.target.value})}
                />
                <span>Large (L)</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Quantità</h3>
            <input
              type="number"
              min="1"
              value={selections.quantity}
              onChange={(e) => setSelections({...selections, quantity: parseInt(e.target.value) || 1})}
              className="border-2 border-gray-200 rounded-lg px-4 py-2 w-24"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-500 text-white py-4 rounded-lg text-lg font-bold hover:bg-pink-600 transition-colors"
          >
            Aggiungi al Carrello - €{(getPrice() * selections.quantity).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};