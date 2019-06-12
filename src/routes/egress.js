const express = require("express");
const routes = express.Router();
const ctrl = require("../controllers/egressController");

routes
    .get("/", ctrl.getAllEgressTypes);

module.exports = routes;
