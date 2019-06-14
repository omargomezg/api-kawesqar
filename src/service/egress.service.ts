import {ConnectionPool} from "mssql";
import {Conn} from "../models/database";

export class EgressService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public getAll() {
        return this.sql.connect()
            .then((pool) => {
                return pool.request().query(`select idtVenta id,
                RTRIM(LTRIM(descripcion)) descripcion, RTRIM(LTRIM(codigo)) codigo
                from tipoEgreso`)
                    .then((r) => {
                        return r.recordset;
                    });
            });
    }
}
