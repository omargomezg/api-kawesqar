const routes = require('express').Router();
const user = require('./user');
const menu = require('./menu');
const subsidiary = require('./subsidiary');
const header = require('./header');
const role = require('./role');
const city = require('./city');
const egress = require('./egress');
const measure = require('./measure');
const supplier = require('./supplier');

routes
    .use('/api/user', user)
    .use('/api/menu', menu)
    .use('/api/subsidiary', subsidiary)
    .use('/api/subsidiary2', function (re, res) {
        res.send({ auto: 'casa' });
    })
    .use('/api/header', header)
    .use('/api/role', role)
    .use('/api/city', city)
    .use('/api/egress', egress)
    .use('/api/measure', measure)
    .use('/api/supplier', supplier);

module.exports = routes;
