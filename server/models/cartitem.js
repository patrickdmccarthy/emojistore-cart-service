'use strict';
module.exports = (sequelize, DataTypes) => {
  var CartItem = sequelize.define('CartItem', {
    quantity: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {});

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, {
      foreignKey: 'CartId',
    });
  };

  console.log(Object.keys(CartItem.rawAttributes));
  return CartItem;
};
