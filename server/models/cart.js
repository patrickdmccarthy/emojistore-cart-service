'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {});


  Cart.associate = (models) => {
    Cart.hasMany(models.CartItem, {
      foreignKey: 'CartId'
    });
  };
  return Cart;
};
