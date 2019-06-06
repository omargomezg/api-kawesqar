const db = require('../models/database');
let Services = {
    getByRut: function (req, res) {
        db.then((pool) => {
            pool.request()
                .query(`SELECT familia.idFamilia AS id, familia.NomFamilia AS name
                        FROM familia
                                 INNER JOIN sucursalAsociada ON familia.idFamilia = sucursalAsociada.idFamilia
                                 INNER JOIN cs_sucursales ON sucursalAsociada.idSucursal = cs_sucursales.idSucursal
                                 INNER JOIN cs_relacion_usuarioSucursal
                                            ON cs_sucursales.idSucursal = cs_relacion_usuarioSucursal.idSucursal
                        WHERE sucursalAsociada.estado = 1
                          AND cs_relacion_usuarioSucursal.rutUsuario = dbo.formatearRut('${req.params.rut}')
                          AND cs_relacion_usuarioSucursal.estado = 1
                        ORDER BY familia.NomFamilia, familia.idFamilia`)
                .then((data) => {
                    res.send(data.recordset);
                })
        })
    }
};

module.exports = Services;
