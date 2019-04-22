const express = require('express');
const routes = express.Router();
const userCtrl = require('../controllers/userController');

routes
    .get('/', userCtrl.getAllUsers)
    .get('/:rut', userCtrl.getByRut)
    .put('/:rut', userCtrl.updateUser);
    
module.exports = routes;