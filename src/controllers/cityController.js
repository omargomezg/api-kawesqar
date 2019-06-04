const db = require('../models/database');
const sql = require('mssql');

var Services = {
    getAllCity: function (req, res) {
        db.then((pool) => {
            pool.request()
                .query(`select codigo, nombre from comunas`).then((data) => {
                    res.send(data.recordset);
                }).catch(err => {
                    res.status(500).send(err);
                })
        })
    }
}

module.exports = Services;