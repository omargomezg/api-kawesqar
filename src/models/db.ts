import {ConnectionPool} from "mssql";

export class Db {
    private  pool: any;
    private config = {
        database: "BExito",
        password: "Kumple22*zu+",
        pool: {
            idleTimeoutMillis: 30000,
            max: 10,
            min: 0,
        },
        port: 1433,
        server: "216.155.90.149",
        user: "sa",
    };

    public poolPromise() {
        if (this.pool) {
            return this.pool;
        }
        this.pool = new ConnectionPool(this.config)
            .connect()
            .then((pool: any) => {
                // tslint:disable-next-line:no-console
                console.log("Connected to MSSQL");
                return pool;
            })
            // tslint:disable-next-line:no-console
            .catch((err: any) => console.log("Database Connection Failed! Bad Config: ", err));
        return this.pool;
    }
}
