process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const db = require('../server/models/index');
const app = require('../app');

describe('GET ', function() {
  it('should return 200', function() {
    return chai.request(app)
      .get('')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.an('string');
      });
  });

  it('should return Not Found', function() {
    return chai.request(app)
    .get('/INVALID_PATH')
    .then(function(res) {
      expect(res).to.have.status(404);
    })
  });
});

describe('Carts', () => {
  beforeEach((done) => { //Before each test we empty the database
    db.Cart.destroy({
      where: {}
    })
    done();
  });

  describe('POST /carts', function() {
    // POST - create new cart
    it('should create new cart', function() {
      return chai.request(app)
        .post('/carts')
        .send({
          userId: 42
        })
        .then(function(res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body.userId).to.equal(42);
          expect(res.body).to.have.own.property('userId');
        })
    });

    // POST - Bad Request
    it('should return Bad Request', function() {
      return chai.request(app)
        .post('/carts')
        .send({
          userId: 'forty two'
        })
        .then(function(res) {
          expect(res).to.have.status(400);
        })
    });
  });

  describe('GET /carts/:id', () => {
    it('it should GET a cart by the given id', () => {
      return cart = db.Cart.create({ userId: 1})
      .then(cart => {
        return chai.request(app)
        .get('/carts/' + cart.toJSON().id)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('userId');
          expect(res.body).to.have.property('purchased');
          expect(res.body.userId).to.equal(1);
          expect(res.body.purchased).to.equal(false);
        });
      });
    });

    it('it should return 404 when an invalid id is given', (done) => {
      chai.request(app)
      .get('/carts/0')
      .then((res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('PUT /checkout', function() {
    // PUT - checkout cart
    it('should fail if address is not included', function() {
      return db.Cart.create({ userId: 2}).then((cart) => {
        return chai.request(app)
        .put('/checkout')
        .send({
          id: cart.id

        })
        .then(function(res) {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.error).to.exist;
        })
      })
    });

    // PUT - checkout cart
    it('should checkout', function() {
      return db.Cart.create({ userId: 2}).then((cart) => {
        return chai.request(app)
        .put('/checkout')
        .send({
          id: cart.id,
          firstName: 'test',
          lastName: 'user',
          address1: '123 fake street',
          address2: 'apartment 1',
          city: 'fakeville',
          state: 'FK',
          zip: '12345',
          country: 'FK',
        })
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body.purchased).to.equal(true);
        })
      })
    });

    // PUT -  404
    it('should return 404 when the cart is not found', function() {
      return cart = db.Cart.create({ userId: 2})
      .then(cart => {
        return chai.request(app)
          .post('/checkout')
          .send({
            userId: 0
          })
          .then(function(res) {
            expect(res).to.have.status(404);
          })
      })
    });
  });
});
