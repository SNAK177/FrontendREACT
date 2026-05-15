// server/server.js
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// Endpoint per creare un payment intent
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency, items, tableNumber, customerInfo } = req.body;

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
        res.status(500).json({ error: error.message });
    }
});

// Endpoint per salvare l'ordine
app.post('/api/orders', async (req, res) => {
    try {
        const { paymentIntentId, items, tableNumber, customerInfo, total } = req.body;

        // TODO: salva l'ordine nel database (ad esempio con SQLite, MongoDB o PostgreSQL)
        console.log('New Order:', {
            paymentIntentId,
            items,
            tableNumber,
            customerInfo,
            total,
            timestamp: new Date().toISOString(),
        });

        res.json({
            success: true,
            orderId: paymentIntentId,
            message: 'Order received successfully',
        });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint di test
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
