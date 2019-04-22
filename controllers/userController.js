const db = require('../models/database');
const sql = require('mssql');

var User = {
    getByRut: function (req, res) {
        res.send({
            rut: req.params.rut,
            nombre: 'Omar Fernando'
        });
    },
    updateUser: function (req, res) {
        res.send({ status: 'updated' });
    },
    getAllUsers: function (req, res) {
        db.then((pool) => {
            pool.request()
            .query(`SELECT [rutUsuario]
                  ,[nombres]
                  ,[apPaterno]
                  ,[apMaterno]
                  ,[fechaCreacion]
                  ,[estado]
                  ,[userName]
                  ,[imagenPerfil]
                  ,[imagenTipo]
                  ,[fono]
                  ,[eMail]
                  ,[salidaVenta]
                  ,[salidaFactura]
                  ,[salidaEmpleados]
                  ,[traspaso]
                  ,[credito]
                  ,[discount]
              FROM [dbo].[cs_usuarios] Order By fechaCreacion desc
            `).then((data) => {
                res.send(data.recordset);
            })
        })
    }
};

module.exports = User;