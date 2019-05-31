const db = require('../models/database');
const sql = require('mssql');
var Services = {
    listAll: function (req, res) {
        db.then((pool) => {
            pool.request()
                .query(`select IdMedida as id, NomMedida as nombre, nomPlural as nombrePlural, lastupdate
                from dbo.medidas order by lastupdate desc`).then((data) => {
                    res.send(data.recordset);
                })
        })
    }
}

module.exports = Services;