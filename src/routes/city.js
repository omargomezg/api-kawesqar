const express = require('express');
const routes = express.Router();
const ctrl = require('../controllers/cityController');

routes
    .get('/', ctrl.getAllCity);

module.exports = routes;