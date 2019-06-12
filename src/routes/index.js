const routes = require("express").Router();
const user = require("./user");
const subsidiary = require("./subsidiary");
const role = require("./role");
const egress = require("./egress");

routes
    .use("/api/user", user)
    .use("/api/subsidiary", subsidiary)
    .use("/api/subsidiary2", function (re, res) {
        res.send({ auto: "casa" });
    })
    .use("/api/role", role)
    .use("/api/egress", egress);

module.exports = routes;
