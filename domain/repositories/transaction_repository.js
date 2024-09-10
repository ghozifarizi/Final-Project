// Import the Transaction model
const Transaction = require('../models/transaction_model');

// Function to save a new transaction
async function create(transactionData) {
  try {
    // Create a new transaction instance
    const newTransaction = new Transaction(transactionData);

    // Save the transaction to the database
    const savedTransaction = await newTransaction.save();
    return savedTransaction;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

// Function to get a transaction by order id
async function getOneByOrderId(orderId) {
  try {
    // Find the transaction by order_id
    const transaction = await Transaction.findOne({ order_id: orderId });
    return transaction;
  } catch (error) {
    console.error('Error getting transaction by order_id:', error);
    throw error;
  }
}

// Function to find all transactions
async function findAll() {
  try {
    // Retrieve all transactions from the database
    const transactions = await Transaction.find();
    return transactions;
  } catch (error) {
    console.error('Error finding transactions:', error);
    throw error;
  }
}

// Function to update a transaction by order id
async function updateOne(orderId, updateData) {
  try {
    // Find the transaction by order_id and update it
    const updatedTransaction = await Transaction.findOneAndUpdate({ order_id: orderId }, updateData, { new: true });
    if (!updatedTransaction) {
      throw new Error('Transaction not found');
    }
    return updatedTransaction;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}

// Function to delete a transaction by order id
async function deleteOne(orderId) {
  try {
    // Find and delete the transaction by order_id
    const result = await Transaction.deleteOne({ order_id: orderId });
    if (result.deletedCount === 0) {
      throw new Error('Transaction not found');
    }
    return { message: 'Transaction deleted successfully' };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
}

// Export repository functions
module.exports = { create, getOneByOrderId, findAll, updateOne, deleteOne };
