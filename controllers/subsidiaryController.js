const db = require('../models/database');
const sql = require('mssql');

var subsidiary = {
    getAll: function (req, res) {
        db.then((pool) => {
            pool.request()
                .query(`
            SELECT [idSucursal]
                  ,[rutSucursal]
                  ,[nombre]
                  ,[direccion]
                  ,[codigo]
                  ,[telefono]
                  ,[rutRepLegal]
                  ,[nombreRepLegal]
                  ,[fax]
                  ,[Giro] as giro
                  ,[registroContado]
                  ,[numInicialRegContado]
              FROM [dbo].[cs_sucursales]            
            `).then((data) => {
                    res.send(data.recordset);
                })
        })
    },
    getById: function (req, res) {
        db.then((pool) => {
            pool.request()
                .input('id', sql.TinyInt, req.params.id)
                .execute('PA_GET_SucursalById', (err, result) => {
                    // ... error checks
                    res.send(result.recordset)
                })
        })
    }
};

module.exports = subsidiary;