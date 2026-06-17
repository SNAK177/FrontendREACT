import React, {createContext, useState, useEffect} from "react";

const CartContext = createContext({
    cart: [],
    addToCart: () => {
    },
    removeFromCart: () => {
    },
    updateQuantity: () => {
    },
    clearCart: () => {
    },
    getTotalItems: () => 0,
    getTotalPrice: () => 0,
    currentTable: "12",
    setCurrentTable: () => {
    },
});
export default CartContext

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [currentTable, setCurrentTable] = useState("12");

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const addToCart = (item) => {
        const existingItemIndex = cart.findIndex(
            (cartItem) =>
                cartItem.id === item.id &&
                JSON.stringify(cartItem.options) === JSON.stringify(item.options)
        );
        let newCart;
        if (existingItemIndex >= 0) {
            // Prima si faceva newCart[existingItemIndex].quantity += ...
            // su un oggetto che era ancora lo stesso riferimento di cart[i]:
            // mutava lo stato esistente invece di crearne uno nuovo.
            newCart = cart.map((cartItem, i) =>
                i === existingItemIndex
                    ? {...cartItem, quantity: cartItem.quantity + item.quantity}
                    : cartItem
            );
        } else {
            newCart = [...cart, item];
        }
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };
    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };
    const updateQuantity = (index, quantity) => {
        if (quantity <= 0) {
            removeFromCart(index);
            return;
        }

        const newCart = cart.map((item, i) =>
            i === index ? {...item, quantity} : item
        );
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };
    const getTotalItems = () =>
        cart.reduce((total, item) => total + item.quantity, 0);
    const getTotalPrice = () =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalPrice,
                currentTable,
                setCurrentTable,
            }}
        >
            {children}
        </CartContext.Provider>
    );

};
