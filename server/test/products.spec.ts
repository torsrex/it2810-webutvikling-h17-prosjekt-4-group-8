import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Product from '../models/product';

const should = chai.use(chaiHttp).should();

describe('Product', () => {

  beforeEach(done => {
    Product.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for products', () => {

    it('should get all the products', done => {
      chai.request(app)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get products count', done => {
      chai.request(app)
        .get('/api/products/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new product', done => {
      const product = { name: 'Fluffy', description: "yolo product", price: 2 };
      chai.request(app)
        .post('/api/product')
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('description');
          res.body.should.have.a.property('price');
          done();
        });
    });

    it('should get a product by its id', done => {
      const product = new Product({ name: 'FancyProduct', description: "yolo desc", price: 4 });
      product.save((error, newProduct) => {
        chai.request(app)
          .get(`/api/product/${newProduct.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.should.have.property('price');
            res.body.should.have.property('_id').eql(newProduct.id);
            done();
          });
      });
    });

    it('should update a product by its id', done => {
      const product = new Product({ name: 'FancyProduct', description: "yolo desc", price: 4 });
      product.save((error, newProduct) => {
        chai.request(app)
          .put(`/api/product/${newProduct.id}`)
          .send({ price: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a product by its id', done => {
      const product = new Product({ name: 'FancyProduct', description: "yolo desc", price: 4 });
      product.save((error, newProduct) => {
        chai.request(app)
          .delete(`/api/product/${newProduct.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});
