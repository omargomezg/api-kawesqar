const db = require('../models/database');
const sql = require('mssql');
var Services = {
    dataHeaderByRut: function (req, res) {
        db.then((pool) => {
            pool.request()
                .input('rut', sql.NVarChar(12), req.params.rut)
                .execute('dataHeaderByRut', (err, result) => {
                    res.send(result.recordset[0])
                })
        })
    }
}

module.exports = Services;