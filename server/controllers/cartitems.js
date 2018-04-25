const CartItem = require('../models').CartItem;

module.exports = {
  create(req, res) {
  console.log(req.body.cartId)
  Object.keys(CartItem.rawAttributes)
    return CartItem
      .create({
        name: req.body.name,
        price: req.body.price,
        CartId: req.params.CartId,
        quantity: 1,
      })
      .then(cartItem => res.status(201).send(cartItem))
      .catch(error => res.status(400).send(error));
  },
};
