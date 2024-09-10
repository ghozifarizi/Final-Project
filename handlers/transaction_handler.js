const transactionUsecase = require('../domain/usecases/transaction_usecase');

// Handler to create a new transaction
async function create(req, res) {
  try {
    const transactionData = req.body;
    const createdTransaction = await transactionUsecase.create(transactionData);
    res.status(201).json({ message: "Transaction created successfully", transactionId: createdTransaction.order_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get list of transactions
async function getList(req, res) {
  try {
    const transactions = await transactionUsecase.getList();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get a transaction by order id
async function getOneByOrderId(req, res) {
  try {
    const orderId = req.params.id;
    const transaction = await transactionUsecase.getOneByOrderId(orderId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update a transaction by order id
async function updateOne(req, res) {
  try {
    const orderId = req.params.id;
    const updateData = req.body;
    const updatedTransaction = await transactionUsecase.updateOne(orderId, updateData);
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: "Transaction updated successfully", transaction: updatedTransaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to delete a transaction by order id
async function deleteOne(req, res) {
  try {
    const orderId = req.params.id;
    const deletedTransaction = await transactionUsecase.deleteOne(orderId);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, getOneByOrderId, updateOne, deleteOne };
