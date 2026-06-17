// server/server.js
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ORDERS_FILE = path.join(__dirname, 'orders.json');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Persistenza minima su file JSON: sostituisce il TODO che c'era prima
// (l'ordine veniva solo loggato in console e poi perso).
function readOrders() {
    try {
        return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
    } catch {
        return [];
    }
}

function saveOrder(order) {
    const orders = readOrders();
    orders.push(order);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// Endpoint per creare un payment intent
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const {amount, currency, items, tableNumber, customerInfo} = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: currency || 'eur',
            metadata: {
                tableNumber,
                customerName: customerInfo.name,
                customerEmail: customerInfo.email,
                items: JSON.stringify(
                    items.map(item => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                ),
            },
            receipt_email: customerInfo.email,
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({error: error.message});
    }
});

// Endpoint per salvare l'ordine
app.post('/api/orders', async (req, res) => {
    try {
        const {paymentIntentId, items, tableNumber, customerInfo, total} = req.body;

        const order = {
            paymentIntentId,
            items,
            tableNumber,
            customerInfo,
            total,
            timestamp: new Date().toISOString(),
        };

        saveOrder(order);
        console.log('New Order saved:', order);

        res.json({
            success: true,
            orderId: paymentIntentId,
            message: 'Order received successfully',
        });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({error: error.message});
    }
});

// Endpoint per leggere gli ordini salvati (utile per un futuro pannello admin)
app.get('/api/orders', (req, res) => {
    res.json(readOrders());
});

// Endpoint di test
app.get('/api/health', (req, res) => {
    res.json({status: 'ok', timestamp: new Date().toISOString()});
});

// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
