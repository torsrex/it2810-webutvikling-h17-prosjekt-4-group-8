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

  //pagination function
  getSomeProducts = (req, res) => {
    const sortingParam = req.query.sortby ? req.query.sortby : "createdAt"
    const sortingOrder = req.query.increasing ? req.query.increasing: 1
    let filter = {}
    if(req.query.filter){
      filter = {$where : "this.category == '"+req.query.category+"'" }
    }else{
      filter = {}
    }
    this.model.paginate(filter, { page: req.params.pageNum, limit:10,
      sort: {[sortingParam]: +sortingOrder}, populate: "user"}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    })
  }

//search function
  search = (req, res) => {
  const sortingParam = req.query.sortby ? req.query.sortby : "createdAt"
  const sortingOrder = req.query.increasing ? req.query.increasing: 1
  const category = req.query.category === "default" ? ".*" : req.query.category

  let regexSearch = new RegExp("\\b^("+req.params.query+")+.*\\b", 'i')
  let categorySearch = new RegExp("^"+category+"$", 'i')

  const filterQuery = {
    $and: [
      {
        "name": { $regex: regexSearch}
      },
      {
        "category": { $regex: categorySearch}
      }
    ],
    price: {$gte: req.params.min, $lte: req.params.max}
  }
    const options = {
    page: req.params.pageNum,
    limit: 10,
    sort: {
      [sortingParam]: +sortingOrder,
        score: {
            $meta: 'textScore'
        },
    },
    select: {
        score: {
            $meta: 'textScore'
        },
    },
    populate: "user",
    lean: false,
    leanWithId: true,
  };
    this.model.paginate(filterQuery,
    options,
        (err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
      })
  }
}
