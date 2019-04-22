//Initiallising node modules
const app = require('express')();
var bodyParser = require("body-parser");
var sql = require("mssql");
const routes = require('./routes/index');

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use('/', routes);

//Setting up server
var server = app.listen(process.env.PORT || 8088, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Initiallising connection string
const dbConfig = {
    user: 'sa',
    password: 'Kumple22*zu+',
    server: '216.155.90.155',
    database: 'farmacia',
    debug: false,
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

//Function to connect to database and execute query
var executeQuery = function (res, query) {
    // console.log(res);
    // console.log(query);
    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error22 while connecting database :- " + err);
            res.send(err);
        }
        else {
            var request = new sql.Request();
            request.query(query, function (err, result) {
                if (err) {
                    console.log(err);
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
    });
}
//Function to connect to database and execute query 1 row
var executeQueryGetId = function (res, query) {
    connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            var request = new Request();
            request.query(query, function (err, result) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    res.send(result[0]);
                }
            });
        }
    });
}

//GET API
// app.get("/api/user", function (req, res) {
//     let query = "select * from cs_usuarios";
//     executeQuery(res, query);
// });

//POST API
app.post("/api/user", function (req, res) {
    var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
    executeQuery(res, query);
});

//PUT API
app.put("/api/user/:id", function (req, res) {
    var query = "UPDATE [user] SET Name= " + req.body.Name + " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
    executeQuery(res, query);
});

// DELETE API
app.delete("/api/user/:id", function (req, res) {
    var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
    executeQuery(res, query);
});

app.get("/api/medida", function (req, res) {
    var query = "select IdMedida as id, NomMedida as nombre, nomPlural as nombrePlural, lastupdate from dbo.medidas order by lastupdate desc";
    executeQuery(res, query);
});

app.get("/api/medida/:id", function (req, res) {
    var query = "select IdMedida as id, NomMedida as nombre, isnull(nomPlural, '') as nombrePlural from dbo.medidas where IdMedida = " + req.params.id;
    executeQueryGetId(res, query);
});

app.put("/api/medida/:id", function (req, res) {
    var query = "EXEC dbo.mantenedorMedidas " + req.params.id + ", '" + req.body.nombre + "', '" + req.body.nombrePlural + "'";
    executeQuery(res, query);
});

app.get("/api/sucursal", function (req, res) {
    var query = "EXEC dbo.PA_LIST_Sucursales";
    executeQuery(res, query);
});

app.get("/api/sucursal/:id", function (req, res) {
    var dbConn = new Connection(dbConfig);
    dbConn.connect().then(function () {
        var request = new Request(dbConn);
        request.input('id', TinyInt, req.params.id)
            .execute("PA_GET_SucursalById").then(function (recordSet) {
                dbConn.close();
                res.send(recordSet[0][0]);
            }).catch(function (err) {
                dbConn.close();
                res.send(err);
            });
    }).catch(function (err) {
        res.send(err);
    });
});

app.put("/api/sucursal/:id", function (req, res) {
    var query = "EXEC dbo.mantenedorSucursal " +
        req.body.id + ", '" +
        req.body.rut + "', '" +
        req.body.nombre + "', '" +
        req.body.direccion + "', " +
        req.body.codigoComuna + ", '" +
        req.body.telefono + "', '" +
        req.body.rutRepLegal + "', '" +
        req.body.nombreRepLegal + "', '" +
        req.body.fax + "', '" +
        req.body.giro + "', " +
        req.body.registroContado + "," +
        req.body.numInicialRegContado + "";
    executeQuery(res, query);
});

app.get("/api/:rut/sucursal", function (req, res) {
    var query = " SELECT cs_sucursales.idSucursal AS id, cs_sucursales.nombre + ' ' + cs_sucursales.direccion AS descripcion " +
        "FROM cs_sucursales INNER JOIN cs_relacion_usuarioSucursal ON cs_sucursales.idSucursal = cs_relacion_usuarioSucursal.idSucursal " +
        "WHERE cs_relacion_usuarioSucursal.rutUsuario = '" + req.params.rut + "' AND cs_relacion_usuarioSucursal.estado = 1 ";
    executeQuery(res, query);
});

app.get("/api/ciudad", function (req, res) {
    var query = "select codigo, nombre from comunas";
    executeQuery(res, query);
});

app.post("/api/existencia", function (req, res) {
    var query = " EXEC listarExistencias '" + req.body.fechaInicio + "', '" + req.body.fechaFin + "'";
    executeQuery(res, query);
});
app.get("/api/existencia/:idExistencia/:idSucursal", function (req, res) {
    var query = "SELECT	existencia.fecha, " +
        "existencia.rutUsuario, " +
        "existencia.idSucursal, " +
        "existencia.estado, " +
        "detalleExistencia.idArticulo, " +
        "detalleExistencia.cantidad, " +
        "ROUND(detalleExistencia.valorUnitario * 1.19, 0) AS valorUnitario, " +
        "detalleExistencia.esGranel, " +
        "detalleExistencia.idbodega, " +
        "Articulos.nomArticulo, " +
        "bodega.descripcion, " +
        "CASE " +
        "    WHEN detalleExistencia.esGranel = 0 THEN (SELECT	nomMedida " +
        "                                                FROM	medidas " +
        "                                                WHERE	idMedida = Articulos.idMedida) " +
        "    ELSE (	SELECT	nomMedida " +
        "            FROM	medidas " +
        "            WHERE	idMedida = Articulos.idMedidaGranel) END AS unMedida, " +
        "cs_sucursales.nombre AS nombreSucursal, " +
        "detalleExistencia.cantidad * ROUND(detalleExistencia.valorUnitario * 1.19, 0) AS total " +
        "FROM existencia INNER JOIN " +
        "                 detalleExistencia ON existencia.idExistencia = detalleExistencia.idExistencia INNER JOIN " +
        "                 Articulos ON detalleExistencia.idArticulo = Articulos.idArticulo INNER JOIN " +
        "                 bodega ON detalleExistencia.idbodega = bodega.idBodega INNER JOIN " +
        "                 cs_sucursales ON existencia.idSucursal = cs_sucursales.idSucursal " +
        "WHERE	existencia.idExistencia = " + req.params.idExistencia +
        "AND existencia.idSucursal= " + req.params.idSucursal +
        "Order by nomArticulo";
    executeQuery(res, query);
});

app.delete("/api/existencia/:id", function (req, res) {
    var query = "update existencia set estado = 0 where idExistencia = " + req.params.id;
    executeQuery(res, query);
});

app.get("/api/header/:rut", function (req, res) {
    var dbConn = new Connection(dbConfig);
    dbConn.connect().then(function () {
        var request = new Request(dbConn);
        request
            .input('rut', VarChar, req.params.rut)
            .execute("dataHeaderByRut").then(function (recordSet) {
                dbConn.close();
                console.log('RecordSet', recordSet);
                res.send(recordSet[0][0]);
            }).catch(function (err) {
                dbConn.close();
                res.send(err);
            });
    }).catch(function (err) {
        res.send(err);
    });
});

app.post("/api/menu/:id", function (req, res) {
    var dbConn = new Connection(dbConfig);
    dbConn.connect().then(function () {
        var request = new Request(dbConn);
        request
            .input('rut', VarChar, req.body.rut)
            .input('parent', Int, req.params.id)
            .execute("PA_GET_MenuByUser").then(function (recordSet) {
                dbConn.close();
                res.send(recordSet[0]);
            }).catch(function (err) {
                dbConn.close();
                res.send(err);
            });
    }).catch(function (err) {
        res.send(err);
    });
});

app.get("/api/user/:rut/discount", function (req, res) {
    var dbConn = new Connection(dbConfig);
    dbConn.connect().then(function () {
        var request = new Request(dbConn);
        request
            .input('user', VarChar, req.params.rut)
            .execute("getDiscountStatus").then(function (recordSet) {
                dbConn.close();
                res.send(recordSet[0][0]);
            }).catch(function (err) {
                dbConn.close();
                res.send(err);
            });
    }).catch(function (err) {
        res.send(err);
    });
});

app.post("/api/user/:rut/discount", function (req, res) {
    var dbConn = new Connection(dbConfig);
    dbConn.connect().then(function () {
        var request = new Request(dbConn);
        request
            .input('user', VarChar, req.body.user)
            .input('status', Bit, req.body.status)
            .execute("discountStatus").then(function (recordSet) {
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