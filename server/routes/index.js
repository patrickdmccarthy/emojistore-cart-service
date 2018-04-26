const cartsController = require('../controllers').carts;
const cartitemsController = require('../controllers').cartitems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the carts API!',
  }));

  app.post('/api/carts', cartsController.create);
  app.get('/api/carts/:id', cartsController.getUserCart);
  app.post('/api/cartItems', cartitemsController.create);
  app.put('/api/cartItems/:id', cartitemsController.update);
  app.delete('/api/cartItems/:id', cartitemsController.destroy);
  app.post('/api/checkout', cartsController.checkout);
};
