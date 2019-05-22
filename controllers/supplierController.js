const db = require('../models/database');

var supplier = {
    getByRut: function (req, res) {
        db.then((pool) => {
            pool.request()
                .query(`SELECT ProvRut AS rut, ProvNombre AS razonSocial FROM proveedor WHERE ProvRut = dbo.formatearRut('${req.params.rut}')`)
                .then((data) => {
                    res.send(data.recordset[0]);
                })
        })
    }
};

module.exports = supplier;
