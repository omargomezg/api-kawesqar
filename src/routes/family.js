const express = require('express');
const routes = express.Router();
const ctrl = require('../controllers/familyController');

routes
    .get("/:rut", ctrl.getByRut);

module.exports = routes;
