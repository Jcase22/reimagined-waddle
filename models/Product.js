import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  description: {type: String, required: true},
  image: { type: String },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;