// Import necessary modules
const repositories = require('../repositories/customer_repository');
const { v4: uuidv4 } = require('uuid');

// Function to create a new customer
const create = async (customerData) => {
    try {
        // Generate a unique customer_id
        const customerId = uuidv4();
        const customer = {
            customer_id: customerId,
            ...customerData
        };
        // Create the customer in the repository
        const createdCustomer = await repositories.create(customer);
        return createdCustomer;
    } catch (error) {
        console.error('Failed to create customer:', error);
        throw new Error('Failed to create customer');
    }
};

// Function to get list of customers
const getList = async () => {
    try {
        const customers = await repositories.findAll();
        return customers;
    } catch (error) {
        console.error('Failed to get list of customers:', error);
        throw new Error('Failed to get list of customers');
    }
};

// Function to get a customer by their customer_id
const getOneByCustomerId = async (customerId) => {
    try {
        const customer = await repositories.findOneByCustomerId(customerId);
        if (!customer) {
            throw new Error('Customer not found');
        }
        return customer;
    } catch (error) {
        console.error('Failed to get customer by ID:', error);
        throw new Error('Failed to get customer by ID');
    }
};

// Function to update a customer by their customer_id
const updateOne = async (customerId, updateData) => {
    try {
        // Find the customer by customer_id first to ensure it exists
        const customer = await repositories.findOneByCustomerId(customerId);
        if (!customer) {
            throw new Error('Customer not found');
        }

        // Update the customer data
        const updatedCustomer = await repositories.updateOne(customerId, updateData);
        return updatedCustomer;
    } catch (error) {
        console.error('Failed to update customer:', error);
        throw new Error('Failed to update customer');
    }
};

// Function to delete a customer by their customer_id
const deleteOne = async (customerId) => {
    try {
        // Check if the customer exists
        const customer = await repositories.findOneByCustomerId(customerId);
        if (!customer) {
            throw new Error('Customer not found');
        }

        // Delete the customer from the repository
        await repositories.deleteOne(customerId);
        return { message: 'Customer deleted successfully' };
    } catch (error) {
        console.error('Failed to delete customer:', error);
        throw new Error('Failed to delete customer');
    }
};

// Export usecase functions
module.exports = { create, getList, getOneByCustomerId, updateOne, deleteOne };
