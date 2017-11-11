import Product from '../models/product';
import BaseCtrl from './base';

export default class ProductCtrl extends BaseCtrl {
  model = Product;

  // Get all
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    }).populate("user").sort({createdAt:-1}).exec() //Sorts by newest first
    //Populate fetches from the other collection
  }


  getSomeProducts = (req, res) => {
    this.model.paginate({}, {page: req.params.pageNum, limit:10, sort: {createdAt: -1}, populate: "user"}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    })
  }

  search = (req, res) => {
    const options = {
    page: req.params.pageNum,
    limit: 10,
    sort: {
        score: {
            $meta: 'textScore'
        }
    },
    select: {
        score: {
            $meta: 'textScore'
        },
    },
    lean: false,
    leanWithId: true,
  };
    this.model.paginate({$text: { $search: req.params.query },
                        price: {$gte: req.params.min, $lte: req.params.max}},
    options,
        (err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
      })
  }
}
