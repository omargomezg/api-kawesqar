const routes = require('express').Router();
const user = require('./user');
const menu = require('./menu');

routes
    .use('/api/user', user)
    .use('/api/menu', menu);

module.exports = routes;