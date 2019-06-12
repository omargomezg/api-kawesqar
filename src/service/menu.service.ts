import { ConnectionPool, Int, NVarChar } from "mssql";
import { Conn } from "../models/database";

export class MenuService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getRoot(rut: string) {
        const pool = await this.sql.connect();
        const r = await pool.request()
            .input("rut", NVarChar(12), rut)
            .input("parent", Int, -1)
            .execute("PA_GET_MenuByUser");
        pool.close();
        return r.recordset;
    }

    public async getChild(rut: string, id: number) {
        const pool = await this.sql.connect();
        const r = await pool.request()
            .input("rut", NVarChar(12), rut)
            .input("parent", Int, id)
            .execute("PA_GET_MenuByUser");
        pool.close();
        return r.recordset;
    }
}
