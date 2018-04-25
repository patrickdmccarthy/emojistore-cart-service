const CartItem = require('../models').CartItem;

module.exports = {
  create(req, res) {
    return CartItem
      .create({
        name: req.body.name,
        price: req.body.price,
        CartId: req.body.CartId,
        quantity: 1,
      })
      .then(cartItem => res.status(201).send(cartItem))
      .catch(error => res.status(400).send(error));
  },
};
