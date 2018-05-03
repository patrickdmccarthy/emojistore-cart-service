const cartsController = require('../controllers').carts;
const cartitemsController = require('../controllers').cartitems;

module.exports = (app) => {
  app.get('', (req, res) => res.status(200).send({
    message: 'Welcome to the carts API!',
  }));

  app.post('/carts', cartsController.create);
  app.get('/carts/:id', cartsController.getUserCart);
  app.post('/cartItems', cartitemsController.create);
  app.put('/cartItems/:id', cartitemsController.update);
  app.delete('/cartItems/:id', cartitemsController.destroy);
  app.post('/checkout', cartsController.checkout);
};
