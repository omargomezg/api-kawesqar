import {config} from "mssql";

export class Conn {
    public config: config = {
        database: "farmacia",
        password: "Kumple22*zu+",
        pool: {
            idleTimeoutMillis: 30000,
            max: 10,
            min: 0,
        },
        port: 1433,
        server: "216.155.90.155",
        user: "sa",
    };
 public getCOnn() {
     return this.config;
 }
}
