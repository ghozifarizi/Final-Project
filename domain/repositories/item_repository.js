const Item = require('../models/item_model');

// Fungsi untuk membuat item baru
const createItem = async (itemData) => {
  try {
    const newItem = new Item(itemData);
    return await newItem.save();  // Menyimpan item baru ke database
  } catch (error) {
    throw new Error('Error creating item: ' + error.message);
  }
};

// Fungsi untuk mengambil semua item
const findAllItems = async () => {
  try {
    return await Item.find();  // Mengambil semua item dari database
  } catch (error) {
    throw new Error('Error fetching items: ' + error.message);
  }
};

// Function to get an item by ID
const findItemById = async (itemId) => {
    try {
      // Mencari item berdasarkan item_id
      const item = await Item.findOne({ item_id: itemId });
      if (!item) {
        throw new Error('Item not found');
      }
      return item;  // Mengembalikan item jika ditemukan
    } catch (error) {
      throw new Error('Error fetching item: ' + error.message);
    }
  };


// Function to update an item by ID
async function updateOne(itemId, updateData) {
    try {
      // Find the item by ID
      const existingItem = await Item.findOne({ item_id: itemId });
      if (!existingItem) {
        throw new Error('Item not found');
      }
  
      // Exclude the _id field from the update data
      delete updateData._id;
  
      // Update the item's data
      Object.assign(existingItem, updateData);
  
      // Set the updated_at field to the current time
      existingItem.updated_at = new Date();
  
      // Save the updated item to the database
      const updatedItem = await existingItem.save();
      return updatedItem;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }
  
// Fungsi untuk menghapus item berdasarkan ID
const deleteOne = async (itemId) => {
  try {
    return await Item.findByIdAndDelete(itemId);  // Menghapus item berdasarkan ID
  } catch (error) {
    throw new Error('Error deleting item: ' + error.message);
  }
};

module.exports = {createItem, findAllItems,findItemById, updateOne, deleteOne};
