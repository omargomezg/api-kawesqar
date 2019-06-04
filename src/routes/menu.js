const express = require('express');
const routes = express.Router();
const menuController = require('../controllers/menuController');

routes
    .get('/:rut', menuController.getRoot)
    .get('/:rut/:father', menuController.getChilds);

module.exports = routes;