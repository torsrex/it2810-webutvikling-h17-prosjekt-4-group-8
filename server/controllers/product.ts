import Product from '../models/product';
import BaseCtrl from './base';

export default class ProductCtrl extends BaseCtrl {
  model = Product;

  getSome = (req, res) => {
    this.model.paginate({}, {page: req.params.pageNum,limit:10}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    })
  }
}
