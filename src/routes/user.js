const express = require("express");
const routes = express.Router();
const ctrl = require("../controllers/userController");

routes
    .get("/", ctrl.getAllUsers)
    .get("/:rut", ctrl.getByRut)
    .get("/:rut/exist", ctrl.exist)
    .get("/:rut/sucursal", ctrl.getSubsidiary)
    .get("/:rut/discount", ctrl.getDiscountStatus)
    .post("/:rut", ctrl.createUser)
    .put("/:rut", ctrl.updateUser)
    .put("/:rut/enable", ctrl.enabled);

module.exports = routes;
