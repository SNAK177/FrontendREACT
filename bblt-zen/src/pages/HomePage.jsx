import React from 'react';
import { List, Wand2 } from 'lucide-react';
import { QRScanner } from '../components/QRScanner';

export const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Scopri il vero gusto del Bubble Tea
            </h2>
            <p className="text-lg text-gray-600">
              Personalizza la tua bevanda perfetta o scegli tra le nostre creazioni signature
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => setCurrentPage('menu')}
                className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
              >
                <List size={20} />
                Vedi il Menu
              </button>
              <button
                onClick={() => setCurrentPage('custom')}
                className="bg-teal-400 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors flex items-center gap-2"
              >
                <Wand2 size={20} />
                Crea il tuo
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-pink-300 to-teal-300 rounded-full flex items-center justify-center">
              <div className="text-6xl">🧋</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <QRScanner setCurrentPage={setCurrentPage} />
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wand2 className="text-white" size={32} />
            </div>
            <h4 className="text-xl font-bold mb-3">100% Personalizzabile</h4>
            <p className="text-gray-600">Crea la tua bevanda perfetta scegliendo tra centinaia di combinazioni</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h4 className="text-xl font-bold mb-3">Servizio Rapido</h4>
            <p className="text-gray-600">Ordina dal tuo tavolo e ricevi la tua bevanda in pochi minuti</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">❤️</span>
            </div>
            <h4 className="text-xl font-bold mb-3">Ingredienti Freschi</h4>
            <p className="text-gray-600">Utilizziamo solo ingredienti di alta qualità e freschi ogni giorno</p>
          </div>
        </div>
      </section>
    </div>
  );
};