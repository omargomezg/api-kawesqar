const express = require('express');
const routes = express.Router();
const headerCtrl = require('../controllers/headerController');

routes
    .get('/:rut', headerCtrl.dataHeaderByRut);

module.exports = routes;