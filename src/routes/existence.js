const express = require('express');
const routes = express.Router();
const ctrl = require('../controllers/existenceController');

routes
    .post("/", ctrl.getExistence);

module.exports = routes;
