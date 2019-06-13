import { ConnectionPool, NVarChar } from "mssql";
import { Conn } from "../models/database";

export class HeaderService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getByRut(rut: string) {
        const pool = await this.sql.connect();
        const r = await pool.request()
            .input("rut", NVarChar(12), rut)
            .execute("dataHeaderByRut");
        await pool.close;
        return r.recordset[0];
    }
}
