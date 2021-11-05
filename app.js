'use strict';

const path = require('path');
const config = require('./config/config.json');
const urljoin = require('url-join');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const di = require('./di').container;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(urljoin(config.BASE_PATH, 'api', 'v1'), require(path.join(__dirname, 'routes')));

app.use((req, res, next) => res.status(404).send({ status: 404 }));

app.disable('x-powered-by');

module.exports = app;
