import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['ring', 'necklace', 'ringbox'],
    required: false,
  },
  productImage:{
    type:[String],
    required: true
 }
});

export default mongoose.model('product', productSchema);

