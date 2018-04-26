'use strict';
module.exports = (sequelize, DataTypes) => {
  var CartItem = sequelize.define('CartItem', {
    quantity: DataTypes.INTEGER,
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    img: {
      type: DataTypes.JSON,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, {
      foreignKey: 'cartId',
    });
  };

  return CartItem;
};
