'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'Carts',
        'firstName',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Carts',
        'lastName',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Carts',
        'address1',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Carts',
        'address2',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Carts',
        'city',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Carts',
        'state',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Carts',
        'zip',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.addColumn(
        'Carts',
        'country',
        {
          type: Sequelize.STRING,
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Carts', 'firstName'),
      queryInterface.removeColumn('Carts', 'lastName'),
      queryInterface.removeColumn('Carts', 'address1'),
      queryInterface.removeColumn('Carts', 'address2'),
      queryInterface.removeColumn('Carts', 'city'),
      queryInterface.removeColumn('Carts', 'state'),
      queryInterface.removeColumn('Carts', 'zip'),
      queryInterface.removeColumn('Carts', 'country'),
    ];
  }
};
