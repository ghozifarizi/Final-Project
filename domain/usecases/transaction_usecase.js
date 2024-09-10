// Import necessary modules
const transactionRepository = require('../repositories/transaction_repository');
const { v4: uuidv4 } = require('uuid');

// Function to create a new transaction
const create = async (transactionData) => {
    try {
        // Generate a unique transaction ID
        const transactionId = uuidv4();

        // Prepare the transaction object
        const transaction = {
            order_id: transactionId,  // Unique transaction ID
            ...transactionData        // Spread transactionData into the transaction object
        };

        // Save the transaction using repository
        const createdTransaction = await transactionRepository.create(transaction);
        return createdTransaction;
    } catch (error) {
        throw new Error('Failed to create transaction');
    }
};

// Function to get list of transactions
const getList = async () => {
    try {
        // Retrieve all transactions using the repository
        const transactions = await transactionRepository.findAll();
        return transactions;
    } catch (error) {
        throw new Error('Failed to get list of transactions');
    }
};

// Function to get a transaction by order ID
const getOneByOrderId = async (orderId) => {
    try {
        // Retrieve a transaction by its order ID using the repository
        const transaction = await transactionRepository.getOneByOrderId(orderId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        return transaction;
    } catch (error) {
        throw new Error('Failed to get transaction by order_id');
    }
};

// Function to update a transaction by order ID
const updateOne = async (orderId, updateData) => {
    try {
        // Retrieve the transaction by its order ID
        const transaction = await transactionRepository.getOneByOrderId(orderId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Update the transaction using the repository
        const updatedTransaction = await transactionRepository.updateOne(orderId, updateData);
        return updatedTransaction;
    } catch (error) {
        throw new Error('Failed to update transaction');
    }
};

// Function to delete a transaction by order ID
const deleteOne = async (orderId) => {
    try {
        // Retrieve the transaction by its order ID
        const transaction = await transactionRepository.getOneByOrderId(orderId);
        if (!transaction) {
            throw new Error('Transaction not found');
        }

        // Delete the transaction using the repository
        await transactionRepository.deleteOne(orderId);
        return { message: 'Transaction deleted successfully' };
    } catch (error) {
        throw new Error('Failed to delete transaction');
    }
};

// Export use case functions
module.exports = { create, getList, getOneByOrderId, updateOne, deleteOne };
