const itemRepository = require('../repositories/item_repository');  // Mengimpor repository
const { v4: uuidv4 } = require('uuid');

// Function to create a new item
const create = async (itemData) => {
    try {
        const itemId = uuidv4();  // Menghasilkan UUID untuk item baru
        const item = {
            item_id: itemId,
            ...itemData
        };
        const createdItem = await itemRepository.createItem(item);
        return createdItem;
    } catch (error) {
        throw new Error('Failed to create item: ' + error.message);
    }
};


// Function to get a list of all items
const getList = async () => {
    try {
        const items = await itemRepository.findAllItems();
        return items;
    } catch (error) {
        throw new Error('Failed to get list of items: ' + error.message);
    }
};


// Function to update an item by item id
const updateOne = async (itemId, updateData) => {
    try {
        // Find the item by item_id first to ensure it exists
        const item = await itemRepository.findItemById(itemId);
        if (!item) {
            throw new Error('Item not found');
        }

        // Update the item data
        const updatedItem = await itemRepository.updateOne(itemId, updateData);
        return updatedItem;
    } catch (error) {
        throw new Error('Failed to update item: ' + error.message);
    }
};

// Function to delete an item by item id
const deleteOne = async (itemId) => {
    try {
        // Check if the item exists
        const item = await itemRepository.findItemById(itemId);
        if (!item) {
            throw new Error('Item not found');
        }

        // Delete the item from the database
        await itemRepository.deleteOne(itemId);
        return { message: 'Item deleted successfully' };
    } catch (error) {
        throw new Error('Failed to delete item: ' + error.message);
    }
};

module.exports = { create, getList, updateOne, deleteOne };
