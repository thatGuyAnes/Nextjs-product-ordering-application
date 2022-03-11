import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 60,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
  address: {
    type: String,
    maxlength: 180,
    required: true,
  },
  paymentMethod: {
    type: Number,
    required: true,
  }
},
{timestamps: true}
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
