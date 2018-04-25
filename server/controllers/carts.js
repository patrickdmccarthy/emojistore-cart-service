const Cart = require('../models').Cart;

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
    return Cart.findOne({ where: {userId: req.params.userId} })
      .then(cart => res.status(201).send(cart))
      .catch(error => res.status(400).send(error));
  }
};
