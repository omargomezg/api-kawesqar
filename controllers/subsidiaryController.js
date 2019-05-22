const db = require('../models/database');
const sql = require('mssql');

var subsidiary = {
    getAll: function (req, res) {
        let subsidiary = [];
        db.then((pool) => {
            pool.request()
                .query(`SELECT idSucursal as id
                ,rutSucursal as rut
                ,cs_sucursales.nombre as descripcion
                ,direccion
                ,cs_sucursales.codigo
                ,comunas.nombre as ciudad
                ,telefono
                ,rutRepLegal
                ,nombreRepLegal as representante
                ,fax
                ,Giro as giro
                ,registroContado
                ,numInicialRegContado
                ,isnull(cs_sucursales.[update], GETDATE()) as updateDate
                ,(select count(1)
                from bodega inner join bodega_sucursal on bodega_sucursal.idBodega = bodega.idBodega
                where bodega_sucursal.idSucursal = cs_sucursales.idSucursal) as bodegasAsociadas
            FROM cs_sucursales inner join comunas on comunas.codigo = cs_sucursales.codigo`).then((data) => {
                    res.send(data.recordset);
                })
        })
    },
    getById: function (req, res) {
        if (Number(req.params.id)) {
            db.then((pool) => {
                pool.request()
                    .input('id', sql.TinyInt, req.params.id)
                    .execute('PA_GET_SucursalById', (err, result) => {
                        if (result.recordsets.length > 0) {
                            res.send(result.recordset[0]);
                        } else {
                            res.send({});
                        }
                    })
            })
        } else {
            res.send({ error: "undefined value" })
        }
    },
    update: function (req, res) {
        try {
            db.then((pool) => {
                pool.request()
                    .input('idSucursal', sql.Int, req.params.id)
                    .input('rutSucursal', sql.VarChar(12), req.body.rut)
                    .input('nombre', sql.VarChar(12), req.body.nombre)
                    .input('direccion', sql.VarChar(80), req.body.direccion)
                    .input('codigo', sql.Int, req.body.codigoComuna)
                    .input('telefono', sql.VarChar(50), req.body.telefono)
                    .input('rutRepLegal', sql.VarChar(12), req.body.rutRepLegal)
                    .input('nombreRepLegal', sql.VarChar(50), req.body.nombreRepLegal)
                    .input('fax', sql.VarChar(50), req.body.fax)
                    .input('giro', sql.NVarChar(250), req.body.giro)
                    .input('registroContado', sql.Bit, req.body.registroContado)
                    .input('numInicialRegContado', sql.Numeric(18, 0), req.body.numInicialRegContado)
                    .execute('mantenedorSucursal', (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.send(req.body);
                        }
                    })
            })
        } catch (err) {
            res.status(500).send({
                error: err
            });
        }
    }
};

module.exports = subsidiary;