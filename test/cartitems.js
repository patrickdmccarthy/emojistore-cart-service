process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const db = require('../server/models/index');
const app = require('../app');

describe('Cart Items', () => {
  beforeEach((done) => {
    db.CartItem.destroy({
      where: {}
    })
    done();
  });

  describe('POST /api/cartItems', function() {
    // POST - create new cart
    it('should create new cartItem', function() {
      let cart = db.Cart.create({ userId: 1})
      .then(cart => {
        return chai.request(app)
          .post('/api/cartItems')
          .send({
            id: 7,
            name: 'white socks',
            cartId: cart.toJSON().id,
            img: { small: 'image_url' },
            price: 42
          })
          .then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body.itemId).to.equal(7);
            expect(res.body.quantity).to.equal(1);
          })
        });
      });

    // POST - Bad Request
    it('should return Bad Request', function() {
      let cart = db.Cart.create({ userId: 1})
      .then(cart => {
        return chai.request(app)
          .post('/api/cartItems')
          .send({
            name: 'socks with missing fields',
            img: { small: 'image_url' },
            price: 42
          })
        .then(function(res) {
          expect(res).to.have.status(400);
        })
      });
    });
  });

  describe('PUT /api/cartitems/:id', () => {
    it('it should GET a cart by the given id', (done) => {
      let cart = db.Cart.create({ userId: 1})
      .then(cart => {
        let cartItem = db.CartItem.create({
          itemId: 9,
          name: 'hot dog socks',
          cartId: cart.toJSON().id,
          img: { small: 'image_url' },
          price: 20,
          quantity: 1
        })
        .then(cartItem => {
          return chai.request(app)
          .put('/api/cartItems/' + cartItem.toJSON().id)
          .send({ quantity: 8 })
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body.quantity).to.equal(8);
            done();
          });
        });
      });
    });

    it('it should return 404 when an invalid id is given', (done) => {
       chai.request(app)
      .put('/api/cartItems/0')
      .send({ quantity: 8 })
      .then((res) => {
        expect(res).to.have.status(404);
        done();
      })
    });
  });

  describe('DELETE /api/cartItems/:id', function() {
    // DELETE - delete cartItem
    it('should destroy the item', function() {
      let cart = db.Cart.create({ userId: 4})
      .then(cart => {
        let cartItem = db.CartItem.create({
          itemId: 11,
          name: 'pug socks',
          cartId: cart.toJSON().id,
          img: { small: 'image_url' },
          price: 25,
          quantity: 1
        })
        .then(cartItem => {
          return chai.request(app)
            .delete(`/api/cartItems/${cartItem.toJSON().id}`)
            .then(function(res) {
              expect(res).to.have.status(204);
            })
          })
        })
      });

    it('it should return 404 when an invalid id is given', (done) => {
       chai.request(app)
      .delete('/api/cartItems/0')
      .then((res) => {
        expect(res).to.have.status(404);
        done();
      })
    });
  });
});
