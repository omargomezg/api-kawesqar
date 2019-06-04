const express = require('express');
const routes = express.Router();
const ctrl = require('../controllers/measureController');

routes
    .get('/', ctrl.listAll);

module.exports = routes;