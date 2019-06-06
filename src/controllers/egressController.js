const db = require('../models/database');
let Services = {
    getAllEgressTypes: function (req, res) {
        db.then((pool) => {
            pool.request()
                .query(`select idtVenta id, RTRIM(LTRIM(descripcion)) descripcion, RTRIM(LTRIM(codigo)) codigo from tipoEgreso`).then((data) => {
                    res.send(data.recordset);
                })
        })
    }
};

module.exports = Services;
