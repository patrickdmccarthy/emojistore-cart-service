require('dotenv').config();

module.exports = {
  development: {
    username: 'database_dev',
    password: 'database_dev',
    database: 'sockshop_dev',
    host: '127.0.0.1',
    dialect: 'sqlite'
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'sockshop_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'sockshop-prod',
    host: process.env.DB_ENDPOINT.split(':')[0],
    dialect: 'postgres',
  }
};
