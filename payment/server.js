require('dotenv').config();

const express = require('express');

const cors = require('cors');


const app = express();
app.use(
    cors({
        origin: "http://localhost:3001",
    })
)
app.use(express.json());

app.listen(3000);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const purchaseItem = new Map([
    [1, {price: 500, name: "Carpool bill"}]
]);

app.post('/create-checkout-session', async (req, res) => {

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // uses credit card
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const storeItem = purchaseItem.get(item.id)
                return {
                    price_data: {
                        currency: 'cad',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.price
                    },
                    quantity: item.quantity
                }
            }),
            success_url:`${process.env.SERVER_URL}/transactionsuccess`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({url: session.url})

    } catch(e) {
        res.status(500).json({error: e.message})
    }
    
})

