import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 60,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  prices: {
    type: [Number],
    required: true,
  },
  options: {
    type: [
      {
        text: {type: String},
        price: {type: Number}
      }
    ]
  },
  description: {
    type: String,
    maxlength: 180,
    required: true,
  },
},
{timestamps: true}
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
