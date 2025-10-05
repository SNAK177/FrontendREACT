import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  currentTable: "12",
  setCurrentTable: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [currentTable, setCurrentTable] = useState("12");

  // Carica il carrello dal localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (item) => {
    const index = cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.options) === JSON.stringify(item.options)
    );

    let newCart;
    if (index >= 0) {
      newCart = [...cart];
      newCart[index].quantity += item.quantity;
    } else {
      newCart = [...cart, item];
    }

    saveCart(newCart);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    saveCart(newCart);
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }

    const newCart = [...cart];
    newCart[index].quantity = quantity;
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getTotalItems = () =>
    cart.reduce((total, item) => total + (item.quantity || 0), 0);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

  const contextValues = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    currentTable,
    setCurrentTable,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};
