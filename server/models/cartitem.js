'use strict';
module.exports = (sequelize, DataTypes) => {
  var CartItem = sequelize.define('CartItem', {
    quantity: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, {
      foreignKey: 'CartId',
    });
  };

  return CartItem;
};
