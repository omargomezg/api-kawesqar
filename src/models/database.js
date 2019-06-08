const sql = require('mssql');

const config = {
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

// promise style:
const pool2 = new sql.ConnectionPool(config);
const pool2Connect = pool2.connect();

pool2.on('error', err => {
    // ... error handler
});


module.exports = pool2Connect;
