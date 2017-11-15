import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate'

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now
  },
  img: String,
  category: String
});

//Adds pagination plugin to schema, to allow for paginated requests
productSchema.plugin(mongoosePaginate)

//Adds an index to make search faster
productSchema.index({'name': 'text', 'description': 'text'},
                    {weights: {name: 2, description: 1}}
                  )


const Product = mongoose.model('Product', productSchema);

export default Product;
