import {ConnectionPool} from "mssql";
import {Conn} from "../models/database";

export class CityService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public getAll() {
        return this.sql.connect()
            .then((pool) => {
                return pool.request().query(`select codigo, nombre from comunas`)
                    .then((r) => {
                        return r.recordset;
                    });
            });
    }
}
