import {ConnectionPool} from "mssql";

export class Db {
    private static pool: any;

    static get getPool(): any {
        return this.pool;
    }

    static set setPool(value: any) {
        this.pool = value;
    }

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
        if (!Db.getPool) {
            Db.setPool = new ConnectionPool(this.config)
                .connect()
                .then((pool: any) => {
                    // tslint:disable-next-line:no-console
                    console.log("Connected to " + this.config.database);
                    return pool;
                })
                // tslint:disable-next-line:no-console
                .catch((err: any) => console.log("Database Connection Failed! Bad Config: ", err));
        }
        return Db.getPool;
    }
}
