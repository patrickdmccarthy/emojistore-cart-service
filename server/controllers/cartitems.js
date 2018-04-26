const CartItem = require('../models').CartItem;

module.exports = {
  create(req, res) {
    return CartItem
      .create({
        itemId: req.body.id,
        name: req.body.name,
        img: req.body.img,
        price: req.body.price,
        cartId: req.body.cartId,
        quantity: 1,
      })
      .then(cartItem => res.status(201).send(cartItem))
      .catch(error => {
        console.log(error)
        return res.status(400).send(error)
        });
  },

  update(req, res) {
    return CartItem.findById(req.params.id)
    .then( cartItem => {
      if (!cartItem) {
        return res.status(404).send({
          message: 'CartItem Not Found',
        });
      }

      return cartItem
      .update({
        quantity: req.body.quantity
      })
      .then(updatedCartItem => res.status(200).send(updatedCartItem))
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return CartItem
      .findById( req.params.id)
      .then(cartItem => {
        if (!cartItem) {
          return res.status(404).send({
            message: 'CartItem Not Found',
          });
        }

        return cartItem
          .destroy()
          .then(() => res.status(200).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
    }
};
