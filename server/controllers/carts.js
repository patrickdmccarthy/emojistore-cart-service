const Cart = require('../models').Cart;
const CartItem = require('../models').CartItem;

module.exports = {
  create(req, res) {
    return Cart
      .create({
        userId: req.body.userId,
      })
      .then(cart => res.status(201).send(cart))
      .catch(error => res.status(400).send(error));
  },

  getUserCart(req, res) {
    return Cart.findById(req.params.id, {
      include: [ CartItem ],
    })
    .then(cart => {
      if (!cart) {
        return res.status(404).send({
          message: 'Cart Not Found',
        });
      }
      return res.status(200).send(cart);
    })
    .catch(error => res.status(400).send(error));
  },

  checkout(req, res) {
    return Cart.findById(req.body.id)
    .then(function (cart) {
      if (cart) {
        cart.updateAttributes({
          purchased: true
        })
        .then(cart => res.status(200).send(cart))
        .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(404).send(error));
    }
};
