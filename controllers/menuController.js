const db = require('../models/database');
const sql = require('mssql');
const spName = 'PA_GET_MenuByUser';

var Menu = {
    /**
     * Get menu root for specific user
     * @param {request} req - Value of Request
     * @param {respnse } res - Value of Response 
     */
    getRoot: function (req, res) {
        db.then((pool) => {
            pool.request()
                .input('rut', sql.VarChar(12), req.params.rut)
                .input('parent', sql.Int, -1)
                .execute(spName, (err, result) => {
                    // ... error checks
                    res.send(result.recordset)
                })
        })
    },
    /**
     * Get menu child for specific User and Menu
     * @param {request} req - Value of Request
     * @param {respnse } res - Value of Response 
     */
    getChilds: function (req, res) {
        db.then((pool) => {
            pool.request()
                .input('rut', sql.VarChar(12), req.params.rut)
                .input('parent', sql.Int, req.params.father)
                .execute(spName, (err, result) => {
                    // ... error checks
                    res.send(result.recordset)
                })
        })
    }

    //     var dbConn = new sql.Connection(db.connectionConfig);
    //     dbConn.connect().then(function () {
    //         var request = new sql.Request(dbConn);
    //         request
    //             .input('rut', sql.VarChar(12), req.params.rut)
    //             .input('parent', sql.Int, req.params.father)
    //             .execute(spName).then(function (recordSet) {
    //                 dbConn.close();
    //                 res.send(recordSet[0]);
    //             }).catch(function (err) {
    //                 dbConn.close();
    //                 res.send(err);
    //             });
    //     }).catch(function (err) {
    //         res.send(err);
    //     });
    // }
};

module.exports = Menu;