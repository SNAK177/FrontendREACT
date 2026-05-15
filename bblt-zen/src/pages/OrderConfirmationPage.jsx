// bblt-zen/src/pages/OrderConfirmationPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import '../styles/OrderConfirmationPage.css';

export const OrderConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, tableNumber } = location.state || {};

    if (!orderId) {
        navigate('/');
        return null;
    }

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <CheckCircle size={80} className="confirmation-icon" />

                <h1 className="confirmation-title">
                    Ordine Confermato!
                </h1>

                <p className="confirmation-message">
                    Il tuo ordine è stato ricevuto e sarà presto preparato.
                </p>

                <div className="order-details">
                    <div className="detail-row">
                        <span className="detail-label">Numero Ordine:</span>
                        <span className="detail-value">{orderId.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Tavolo:</span>
                        <span className="detail-value">#{tableNumber}</span>
                    </div>
                </div>

                <div className="info-box">
                    <p className="info-text">
                        Il tuo ordine verrà servito direttamente al tuo tavolo.
                        Tempo di attesa stimato: <strong>10-15 minuti</strong>
                    </p>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="home-button"
                >
                    <Home size={20} />
                    Torna alla Home
                </button>
            </div>
        </div>
    );
};