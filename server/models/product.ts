import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate'

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  img: String
});

productSchema.plugin(mongoosePaginate)

const Product = mongoose.model('Product', productSchema);

export default Product;
