const express = require('express');
const routes = express.Router();
const subsidiaryCtrl = require('../controllers/subsidiaryController');

routes
    .get('/', subsidiaryCtrl.getAll)
    .get('/:id', subsidiaryCtrl.getById)
    .put('/:id', subsidiaryCtrl.update);

module.exports = routes;