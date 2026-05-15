// bblt-zen/src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripePromise from '../utils/stripe';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/PaymentPage.css';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cart, getTotalPrice, currentTable, clearCart } = useCart();

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#1f2937',
                '::placeholder': {
                    color: '#9ca3af',
                },
                iconColor: '#ec4899',
            },
            invalid: {
                color: '#ef4444',
                iconColor: '#ef4444',
            },
        },
        hidePostalCode: true,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!customerInfo.name || !customerInfo.email) {
            setError('Per favore compila tutti i campi obbligatori');
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // 1. Crea il payment intent sul backend
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: Math.round(getTotalPrice() * 100), // convertito in centesimi
                    currency: 'eur',
                    items: cart,
                    tableNumber: currentTable,
                    customerInfo,
                }),
            });

            const { clientSecret } = await response.json();

            // 2. Conferma il pagamento
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: customerInfo.name,
                            email: customerInfo.email,
                        },
                    },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                setSuccess(true);

                // Invia l'ordine al backend
                await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentIntentId: paymentIntent.id,
                        items: cart,
                        tableNumber: currentTable,
                        customerInfo,
                        total: getTotalPrice(),
                    }),
                });

                // Pulisci il carrello
                clearCart();

                // Reindirizza alla pagina di conferma dopo 2 secondi
                setTimeout(() => {
                    navigate('/order-confirmation', {
                        state: {
                            orderId: paymentIntent.id,
                            tableNumber: currentTable
                        }
                    });
                }, 2000);
            }
        } catch (err) {
            setError('Si è verificato un errore durante il pagamento. Riprova.');
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    if (success) {
        return (
            <div className="success-container">
                <CheckCircle size={64} className="success-icon" />
                <h2 className="success-title">Pagamento Completato!</h2>
                <p className="success-message">
                    Grazie per il tuo ordine. Ti stiamo reindirizzando...
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-section">
                <h3 className="section-title">
                    <CreditCard size={20} />
                    Informazioni Cliente
                </h3>

                <div className="input-group">
                    <label htmlFor="name" className="input-label">
                        Nome Completo *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="text-input"
                        placeholder="Mario Rossi"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email" className="input-label">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="text-input"
                        placeholder="mario.rossi@email.com"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="phone" className="input-label">
                        Telefono (opzionale)
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="text-input"
                        placeholder="+39 123 456 7890"
                    />
                </div>
            </div>

            <div className="form-section">
                <h3 className="section-title">
                    <Lock size={20} />
                    Dettagli Pagamento
                </h3>

                <div className="card-element-wrapper">
                    <CardElement options={cardElementOptions} />
                </div>
            </div>

            {error && (
                <div className="error-message">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div className="payment-summary">
                <div className="summary-row">
                    <span>Tavolo:</span>
                    <span className="summary-value">#{currentTable}</span>
                </div>
                <div className="summary-row">
                    <span>Articoli:</span>
                    <span className="summary-value">{cart.length}</span>
                </div>
                <div className="summary-row total-row">
                    <span>Totale:</span>
                    <span className="summary-value">€{getTotalPrice().toFixed(2)}</span>
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || processing}
                className="submit-button"
            >
                {processing ? 'Elaborazione...' : `Paga €${getTotalPrice().toFixed(2)}`}
            </button>

            <div className="security-info">
                <Lock size={16} />
                <span>Pagamento sicuro con Stripe</span>
            </div>
        </form>
    );
};

export const PaymentPage = () => {
    const { cart } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="payment-container">
            <h1 className="payment-title">Completa il Pagamento</h1>

            <div className="payment-content">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};