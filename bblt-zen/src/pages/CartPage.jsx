import React from 'react';
import {ShoppingCart, X, Plus, Minus} from 'lucide-react';
import {useCart} from '../hooks/useCart';
import '../styles/CartPage.css';

export const CartPage = () => {
    const {cart, removeFromCart, updateQuantity, getTotalPrice, clearCart} = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-container empty-cart">
                <h1 className="cart-title">Il tuo Carrello</h1>
                <p className="empty-cart-message">Il carrello è vuoto</p>
                <ShoppingCart size={64} className="empty-cart-icon"/>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Il tuo Carrello</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="item-header">
                                <div className="item-details">
                                    <h3 className="item-title">{item.name}</h3>
                                    {item.options && (
                                        <div className="item-options">
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
                                    className="remove-button"
                                >
                                    <X size={24}/>
                                </button>
                            </div>

                            <div className="item-footer">
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => updateQuantity(index, item.quantity - 1)}
                                        className="quantity-button"
                                    >
                                        <Minus size={20}/>
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(index, item.quantity + 1)}
                                        className="quantity-button"
                                    >
                                        <Plus size={20}/>
                                    </button>
                                </div>
                                <span className="item-price">
                  €{(item.price * item.quantity).toFixed(2)}
                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="total-row">
                        <span className="total-label">Totale:</span>
                        <span className="total-price">€{getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => {
                            alert('Ordine confermato! Grazie per il tuo acquisto.');
                            clearCart();
                        }}
                        className="confirm-button"
                    >
                        Conferma Ordine
                    </button>
                    <button
                        onClick={clearCart}
                        className="clear-button"
                    >
                        Svuota Carrello
                    </button>
                </div>
            </div>
        </div>
    );
};