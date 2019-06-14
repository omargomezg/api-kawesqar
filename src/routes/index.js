const routes = require("express").Router();
const user = require("./user");

routes
    .use("/api/user", user);

module.exports = routes;
