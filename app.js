const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();

app.use(cors())
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);

app.get('*', (req, res) => res.status(404).send());

module.exports = app;
