const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;