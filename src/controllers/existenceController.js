const db = require('../models/database');

let existence = {
    getExistence: function (req, res) {
        if (req.body.idBodega === 0) {
            req.body.idBodega = null;
        }
        if (req.body.name === undefined) {
            req.body.name = '';
        }
        db.then((pool) => {
            pool.request()
                .query(`SELECT * from existenciaHoy WHERE idBodega = isnull(${req.body.idBodega}, idBodega) AND idSucursal = ${req.body.idSucursal}`)
                .then((data) => {
                    if (req.body.name !== '') {
                        res.send(data.recordset.filter(r => {
                                return r.nomArticulo.toLowerCase().indexOf(`${req.body.name.toLowerCase()}`) > -1
                            })
                        );
                    }
                    res.send(data.recordset);
                })
        })
    }
};

module.exports = existence;
