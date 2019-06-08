//Initiallising node modules
const app = require('express')();
var bodyParser = require("body-parser");
var sql = require("mssql");
const routes = require('./routes');

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
let server = app.listen(process.env.PORT || 8088, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
});

//Initiallising connection string
const dbConfig = {
    user: 'sa',
    password: 'Kumple22*zu+',
    server: 'localhost',
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
        } else {
            var request = new sql.Request();
            request.query(query, function (err, result) {
                if (err) {
                    console.log(err);
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                } else {
                    res.send(result);
                }
            });
        }
    });
};
//Function to connect to database and execute query 1 row
var executeQueryGetId = function (res, query) {
    connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        } else {
            var request = new Request();
            request.query(query, function (err, result) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                } else {
                    res.send(result[0]);
                }
            });
        }
    });
};

//GET API
// app.get("/api/user", function (req, res) {
//     let query = "select * from cs_usuarios";
//     executeQuery(res, query);
// });
app.get('/api/medida/:id', function (req, res) {
    var query = `select IdMedida as id, NomMedida as nombre, isnull(nomPlural, '') as nombrePlural
                 from dbo.medidas
    where IdMedida = ${req.params.id}`;
    executeQueryGetId(res, query);
});

app.put("/api/medida/:id", function (req, res) {
    var query = "EXEC dbo.mantenedorMedidas " + req.params.id + ", '" + req.body.nombre + "', '" + req.body.nombrePlural + "'";
    executeQuery(res, query);
});

/**
 * @deprecated was replaced with /api/subsidiary
 */
app.get("/api/sucursal", function (req, res) {
    res.redirect('/api/subsidiary/');
});

/**
 * @deprecated was replaced with /api/subsidiary/id
 */
app.get("/api/sucursal/:id", function (req, res) {
    res.redirect('/api/subsidiary/' + req.params.id);
});

app.get("/api/ciudad", function (req, res) {
    let query = `select codigo, nombre from comunas`;
    executeQuery(res, query);
});

app.post("/api/existencia", function (req, res) {
    let query = `EXEC listarExistencias '${req.body.fechaInicio}', '${req.body.fechaFin}'`;
    executeQuery(res, query);
});
app.get("/api/existencia/:idExistencia/:idSucursal", function (req, res) {
    let query = `SELECT	existencia.fecha, existencia.rutUsuario, 
        existencia.idSucursal, 
        existencia.estado, 
        detalleExistencia.idArticulo, 
        detalleExistencia.cantidad,
        ROUND(detalleExistencia.valorUnitario * 1.19, 0) AS valorUnitario,
        detalleExistencia.esGranel,
        detalleExistencia.idbodega,
        Articulos.nomArticulo,
        bodega.descripcion,
        CASE
            WHEN detalleExistencia.esGranel = 0 THEN (SELECT	nomMedida
                                                        FROM	medidas
                                                        WHERE	idMedida = Articulos.idMedida)
            ELSE (	SELECT	nomMedida
                    FROM	medidas
                    WHERE	idMedida = Articulos.idMedidaGranel) END AS unMedida,
        cs_sucursales.nombre AS nombreSucursal,
        detalleExistencia.cantidad * ROUND(detalleExistencia.valorUnitario * 1.19, 0) AS total
        FROM existencia INNER JOIN
                         detalleExistencia ON existencia.idExistencia = detalleExistencia.idExistencia INNER JOIN
                         Articulos ON detalleExistencia.idArticulo = Articulos.idArticulo INNER JOIN
                         bodega ON detalleExistencia.idbodega = bodega.idBodega INNER JOIN
                         cs_sucursales ON existencia.idSucursal = cs_sucursales.idSucursal
        WHERE	existencia.idExistencia = ${req.params.idExistencia}
        AND existencia.idSucursal= ${req.params.idSucursal}
        Order by nomArticulo`;
    executeQuery(res, query);
});

app.delete("/api/existencia/:id", function (req, res) {
    let query = `update existencia
                 set estado = 0
    where idExistencia = ${req.params.id}`;
    executeQuery(res, query);
});

app.post("/api/user/:rut/discount", function (req, res) {
    let dbConn = new Connection(dbConfig);
    dbConn.connect().then(function () {
        let request = new Request(dbConn);
        request
            .input('user', sql.VarChar(12), req.body.user)
            .input('status', sql.Bit(), req.body.status)
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
