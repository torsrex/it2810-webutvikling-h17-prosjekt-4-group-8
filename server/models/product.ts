import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lat: Number,
  long: Number,
  img: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
