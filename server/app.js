const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ApliTapri', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Define a schema and model for orders
const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    tableNumber: { type: String, required: true },
    orders: [
        {
            item: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            total: { type: Number, required: true },
        }
    ],
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle placing an order
app.post('/api/order', async (req, res) => {
    try {
        const { customerName, tableNumber, orders } = req.body;

        // Validate input
        if (!customerName || !tableNumber || !Array.isArray(orders) || orders.length === 0) {
            return res.status(400).send({ message: 'Invalid order data' });
        }

        // Calculate total amount and create order entries
        const orderDetails = orders.map(item => {
            const total = item.quantity * item.price;
            return {
                ...item,
                total
            };
        });

        const totalAmount = orderDetails.reduce((sum, order) => sum + order.total, 0);

        const newOrder = new Order({
            customerName,
            tableNumber,
            orders: orderDetails,
            totalAmount
        });

        await newOrder.save();
        res.status(201).send({ message: 'Order placed successfully!', orderId: newOrder._id });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send({ message: 'Error placing order', error });
    }
});

// Route to get an order by ID
app.get('/api/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        res.send(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).send({ message: 'Error fetching order', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
