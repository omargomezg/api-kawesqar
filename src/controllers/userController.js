const db = require("../models/database");
const sql = require("mssql");

let User = {
    getAllUsers: function(req, res) {
    },
    getByRut: function(req, res) {
        db.then((pool) => {
            pool.request()
                .query(`SELECT nombres,
                                apPaterno,
                                apMaterno,
                                fechaCreacion,
                                estado,
                                userName,
                                fono,
                                eMail,
                                salidaVenta,
                                salidaFactura,
                                salidaEmpleados,
                                rol = ISNULL((SELECT top 1 rol.idRol FROM cs_rol rol INNER JOIN
                                    cs_relacion_usuarioRol ur ON ur.idRol = rol.idRol
                                    WHERE  ur.rutUsuario = cs_usuarios.rutUsuario and ur.estado = 1
                                    ), rol)
                    FROM cs_usuarios WHERE rutUsuario = dbo.formatearRut('${req.params.rut}')`).then((data) => {
                res.send(data.recordset[0]);
            });
        });
    },
    exist: function(req, res) {
        db.then((pool) => {
            pool.request()
                .query(`SELECT users = count(1)
                FROM cs_usuarios WHERE rutUsuario = dbo.formatearRut('${req.params.rut}')`).then((data) => {
                res.send({value: data.recordset[0].users > 0});
            });
        });
    },
    enabled: function(req, res) {
        db.then((pool) => {
            pool.request()
                .query(`update cs_usuarios set estado = '${req.body.state}', updated = GETDATE() WHERE rutUsuario = dbo.formatearRut('${req.params.rut}')`)
                .then(() => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.send(req.body);
                    }
                });
        });
    },
    getDiscountStatus: function(req, res) {
        db.then((pool) => {
            pool.request()
                .input("user", sql.NVarChar(12), req.params.rut)
                .execute("getDiscountStatus", (err, result) => {
                    if (result.recordsets.length > 0) {
                        res.send(result.recordset[0]);
                    } else {
                        res.send({});
                    }
                });
        });
    },
    updateUser: function(req, res) {
        db.then((pool) => {
            pool.request()
                .input("rutUsuario", sql.VarChar(12), req.params.rut)
                .input("nombres", sql.NVarChar(256), req.body.nombres)
                .input("apPaterno", sql.NVarChar(256), req.body.apPaterno)
                .input("apMaterno", sql.NVarChar(256), req.body.apMaterno)
                .input("clave", sql.NVarChar(50), req.body.clave)
                .input("userName", sql.VarChar(50), req.body.userName)
                .input("fono", sql.NChar(10), req.body.fono)
                .input("eMail", sql.NVarChar(256), req.body.eMail)
                .input("salidaVenta", sql.Bit, req.body.salidaVenta)
                .input("salidaFactura", sql.Bit, req.body.salidaFactura)
                .input("salidaEmpleados", sql.Bit, req.body.salidaEmpleados)
                .input("idEgresoDefault", sql.Bit, req.body.egreso)
                .input("rol", sql.Int, req.body.rol)
                .execute("mantenedorUsuario", (err) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.send(req.body);
                    }
                });
        });
    },
    createUser: function(req, res) {
        db.then((pool) => {
            pool.request()
                .input("rutUsuario", sql.VarChar(12), req.params.rut)
                .input("nombres", sql.NVarChar(256), req.body.nombres)
                .input("apPaterno", sql.NVarChar(256), req.body.apPaterno)
                .input("apMaterno", sql.NVarChar(256), req.body.apMaterno)
                .input("clave", sql.NVarChar(50), req.body.clave)
                .input("userName", sql.VarChar(50), req.body.userName)
                .input("fono", sql.NChar(10), req.body.fono)
                .input("eMail", sql.NVarChar(256), req.body.eMail)
                .input("salidaVenta", sql.Bit, req.body.salidaVenta)
                .input("salidaFactura", sql.Bit, req.body.salidaFactura)
                .input("salidaEmpleados", sql.Bit, req.body.salidaEmpleados)
                .input("idEgresoDefault", sql.Bit, req.body.egreso)
                .input("rol", sql.Int, req.body.rol)
                .execute("mantenedorUsuario", (err) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.send(req.body);
                    }
                });
        });
    },
    getAllSuppliers: function(req, res) {
        db.then((pool) => {
            pool.request()
                .query(`SELECT rutUsuario,
                            nombres,
                            apPaterno,
                            [apMaterno],
                            [fechaCreacion],
                            [estado],
                            [userName],
                            [imagenPerfil],
                            [imagenTipo],
                            [fono],
                            [eMail],
                            [salidaVenta],
                            [salidaFactura],
                            [salidaEmpleados],
                            [traspaso],
                            [credito],
                            [discount],
                            updated,
                               DefaultRol = ISNULL((SELECT top 1 rol.titulo
                                                    FROM cs_rol rol
                                                             INNER JOIN cs_relacion_usuarioRol ur ON ur.idRol = rol.idRol
                                                    WHERE ur.rutUsuario = cs_usuarios.rutUsuario
                                                      and ur.estado = 1), (select titulo from cs_rol where idRol = rol))
                        FROM cs_usuarios
                        Order By updated desc              `).then((data) => {
                res.send(data.recordset);
            });
        });
    },
    getSubsidiary: function(req, res) {
        db.then((pool) => {
            pool.request()
                .query(`
                SELECT cs_sucursales.idSucursal AS id, cs_sucursales.nombre + ' ' + cs_sucursales.direccion AS descripcion
                FROM cs_sucursales INNER JOIN cs_relacion_usuarioSucursal ON cs_sucursales.idSucursal = cs_relacion_usuarioSucursal.idSucursal
                WHERE dbo.formatearRut(cs_relacion_usuarioSucursal.rutUsuario) = '${req.params.rut}' AND cs_relacion_usuarioSucursal.estado = 1
            `).then((data) => {
                res.send(data.recordset);
            });
        });
    },
};

module.exports = User;
