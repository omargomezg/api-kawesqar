const mysql = require('mssql');

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

// connect to database
dbConfig.connect();

module.exports = dbConfig; 