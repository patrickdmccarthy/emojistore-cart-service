const CartItem = require('../models').CartItem;

module.exports = {
  create(req, res) {
    return CartItem
      .create({
        itemId: req.body.id,
        name: req.body.name,
        symbol: req.body.symbol,
        price: req.body.price,
        cartId: req.body.cartId,
        quantity: 1,
      })
      .then(cartItem => res.status(201).send(cartItem))
      .catch(error => res.status(400).send(error));
  },
};
