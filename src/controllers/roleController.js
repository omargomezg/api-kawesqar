const db = require('../models/database');
let Services = {
    listRoles: function (req, res) {
        db.then((pool) => {
            pool.request()
                .query(`
                    SELECT idRol
                         , titulo
                         , descripcion
                         , estado
                         , accesoVenta
                         , valorDescuento
                         , ventAdmin
                         , isDefault
                    FROM dbo.cs_rol
                `).then((data) => {
                res.send(data.recordset);
            })
        })
    }
};

module.exports = Services;
