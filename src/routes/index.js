const routes = require("express").Router();
const user = require("./user");
const subsidiary = require("./subsidiary");

routes
    .use("/api/user", user);

module.exports = routes;
