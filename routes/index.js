const routes = require('express').Router();
const user = require('./user');
const menu = require('./menu');
const subsidiary = require('./subsidiary');

routes
    .use('/api/user', user)
    .use('/api/menu', menu)
    .use('/api/subsidiary', subsidiary)
    .use('/api/subsidiary2', function(re, res){
        res.send({auto: 'casa'});
    });

module.exports = routes;