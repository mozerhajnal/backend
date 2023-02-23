import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  status: {
    type: String,
  },
  paidDate: {
    type: Date, 
    default: Date.now
  },
  paidAmount: {
    type: Number,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'product',
  },
});

export default mongoose.model('purchase', purchaseSchema);