const itemUsecase = require('../domain/usecases/item_usecase');

// Handler to create a new item
async function create(req, res) {
  try {
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
      return res.status(400).json({ message: "Name, Description, Price, and Stock are required" });
    }
    const item = { name, description, price, stock };
    const newItem = await itemUsecase.create(item);
    res.status(201).json({ message: "Item created successfully", itemId: newItem.item_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to get all items
async function getList(req, res) {
  try {
    const items = await itemUsecase.getList();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to update an item by ID
async function updateOne(req, res) {
  try {
    const itemId = req.params.id;
    const { name, description, price, stock } = req.body;

    if (!name || !description || !price || !stock) {
      return res.status(400).json({ message: "Name, Description, Price, and Stock are required" });
    }

    const updateData = { name, description, price, stock };
    const updatedItem = await itemUsecase.updateOne(itemId, updateData);
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

// Handler to delete an item by ID
async function deleteOne(req, res) {
  try {
    const itemId = req.params.id;

    const deletedItem = await itemUsecase.deleteOne(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}

module.exports = { create, getList, updateOne, deleteOne };
