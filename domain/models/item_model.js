const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true,
    unique: true
}, 
  name: {
    type: String,
    required: true 
},
  description: {
    type: String,
    required: true,
    unique: true
},
  price: {
    type: Number,
    required: true

},
  stock: {
    type: Number,
    required: true,
}
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
