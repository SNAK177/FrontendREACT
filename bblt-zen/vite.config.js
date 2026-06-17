import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// Se hai già un vite.config.js, basta unire questo blocco "server.proxy"
// al tuo file esistente: senza proxy, in dev le fetch a /api/* di
// PaymentPage.jsx non arrivano da nessuna parte (il dev server di Vite
// e il server Express girano su porte diverse).
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
});
