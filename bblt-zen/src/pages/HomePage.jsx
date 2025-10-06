import React from 'react';
import {List, Wand2} from 'lucide-react';
import {QRScanner} from '../components/QRScanner.jsx';
import '../styles/HomePage.css';

export const HomePage = ({setCurrentPage}) => {
    return (
        <div className="page-container">
            <section className="hero-section">
                <div className="hero-grid">
                    <div className="hero-content">
                        <h2 className="hero-title">
                            Scopri il vero gusto del Bubble Tea
                        </h2>
                        <p className="hero-description">
                            Personalizza la tua bevanda perfetta o scegli tra le nostre creazioni signature
                        </p>
                        <div className="button-container">
                            <button
                                onClick={() => setCurrentPage('menu')}
                                className="menu-button"
                            >
                                <List size={20}/>
                                Vedi il Menu
                            </button>
                            <button
                                onClick={() => setCurrentPage('custom')}
                                className="custom-button"
                            >
                                <Wand2 size={20}/>
                                Crea il tuo
                            </button>
                        </div>
                    </div>
                    <div className="bubble-tea-icon">
                        <div className="text-6xl">🧋</div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <QRScanner setCurrentPage={setCurrentPage}/>
            </section>

            <section className="features-section">
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Wand2 className="text-white" size={32}/>
                        </div>
                        <h4 className="feature-title">100% Personalizzabile</h4>
                        <p className="feature-description">Crea la tua bevanda perfetta scegliendo tra centinaia di
                            combinazioni</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="text-white text-2xl">⚡</span>
                        </div>
                        <h4 className="feature-title">Servizio Rapido</h4>
                        <p className="feature-description">Ordina dal tuo tavolo e ricevi la tua bevanda in pochi
                            minuti</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <span className="text-white text-2xl">❤️</span>
                        </div>
                        <h4 className="feature-title">Ingredienti Freschi</h4>
                        <p className="feature-description">Utilizziamo solo ingredienti di alta qualità e freschi ogni
                            giorno</p>
                    </div>
                </div>
            </section>
        </div>
    );
};