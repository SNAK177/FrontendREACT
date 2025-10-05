import React from 'react';
import { useCart } from '../hooks/useCart';
import { ProductCard } from '../components/productcard';
import { products } from '../data/products';

export const MenuPage = () => {
  const { addToCart, currentTable } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceL,
      quantity: 1,
      options: product.options
    });
    alert(`${product.name} aggiunto al carrello!`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-pink-500">Menu Bubble Tea</h1>
        <div className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg font-bold">
          Tavolo #{currentTable}
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};