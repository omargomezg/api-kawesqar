var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/menu/:rut/:id', function (req, res) {
    var dbConn = new sql.Connection(dbConfig);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request
            .input('rut', sql.VarChar, req.params.rut)
            .input('parent', sql.Int, req.params.id)
            .execute("PA_GET_MenuByUser").then(function (recordSet) {
                dbConn.close();
                res.send(recordSet);
            }).catch(function (err) {
                dbConn.close();
                res.send(err);
            });
    }).catch(function (err) {
        res.send(err);
    });
});

module.exports = router;