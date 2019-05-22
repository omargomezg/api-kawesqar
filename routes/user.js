const express = require('express');
const routes = express.Router();
const userCtrl = require('../controllers/userController');

routes
    .get('/', userCtrl.getAllUsers)
    .get('/:rut', userCtrl.getByRut)
    .get('/:rut/exist', userCtrl.exist)
    .put('/:rut', userCtrl.updateUser)
    .post('/:rut', userCtrl.createUser)
    .get('/:rut/sucursal', userCtrl.getSubsidiary)
    .get('/:rut/discount', userCtrl.getDiscountStatus)
    .put('/:rut/enable', userCtrl.enabled);

module.exports = routes;