import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';
import Product from '../models/product'

export default class UserCtrl extends BaseCtrl {
  model = User;


  // Get by id, and fetches related products
  getUserWithProducts = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    }).populate('products');
  }

  login = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  }

  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }).exec((err, removed) =>{
      Product.find({user:req.params.id}).remove().exec()
      if (err) { return console.error(err); }
      res.sendStatus(200);
    });

  }
}
