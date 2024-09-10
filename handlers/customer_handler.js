const customerUsecase = require('../domain/usecases/customer_usecase');

// Handler to create a new role
async function create(req, res) {
  try {
    const { name, address } = req.body;
    if (!name || !address ) {
      return res.status(400).json({ message: "Name and address are required" });
    }
    const customer = { name, address };
    const newCustomer = await customerUsecase.create(customer);
    res.status(201).json({ message: "Customer created successfully", customerId: newCustomer.role_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get all customers
async function getList(req, res) {
  try {
    const customers = await customerUsecase.getList();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get a customer by customer_id
async function getOneByCustomerId(req, res) {
  try {
    const customerId = req.params.id;
    const customer = await customerUsecase.getOneByCustomerId(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update a customer
async function updateOne(req, res) {
  try {
    const customerId = req.params.id;
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ message: "Name, Email, and Address are required" });
    }

    const updateData = { name, email, address };
    const updatedCustomer = await customerUsecase.updateOne(customerId, updateData);

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer updated successfully', customer: updatedCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to delete a customer
async function deleteOne(req, res) {
  try {
    const customerId = req.params.id;

    const deletedCustomer = await customerUsecase.deleteOne(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, getOneByCustomerId, updateOne, deleteOne };
