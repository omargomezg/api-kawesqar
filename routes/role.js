const express = require('express');
const routes = express.Router();
const rolesController = require('../controllers/roleController');

routes
    .get('/', rolesController.listRoles);

module.exports = routes;