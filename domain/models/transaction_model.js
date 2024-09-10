const mongoose = require('mongoose');

// Sub-schema for Payment
const paymentSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        required: true,
        unique: true
    },
    payment_method: {
        type: String,
        required: true,
        enum: ['credit_card', 'paypal', 'bank_transfer', 'ewallet']
    },
    payment_status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed', 'refunded']
    },
    amount: {
        type: Number,
        required: true
    },
    transaction_date: {
        type: Date,
        default: Date.now
    }
});

// Sub-schema for Delivery
const deliverySchema = new mongoose.Schema({
    delivery_id: {
        type: String,
        required: true,
        unique: true
    },
    delivery_status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped', 'in_transit', 'delivered', 'cancelled']
    },
    delivery_address: {
        type: String,
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
    },
    tracking_number: {
        type: String,
        unique: true,
        required: true
    }
});

// Main Transaction Schema
const transactionSchema = new mongoose.Schema({
    order_id: {
        type: String,
        required: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'shipped', 'completed', 'cancelled']
    },
    payment: paymentSchema,  // Embedding Payment schema
    delivery: deliverySchema,  // Embedding Delivery schema
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
