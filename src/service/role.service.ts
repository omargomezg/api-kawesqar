import { ConnectionPool } from "mssql";
import { Conn } from "../models/database";

export class RoleService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getList() {
        const pool = await this.sql.connect();
        const r = await pool.request().query(`
            SELECT idRol
                ,titulo
                ,descripcion
                ,estado
                ,accesoVenta
                ,valorDescuento
                ,ventAdmin
                ,isDefault
            FROM dbo.cs_rol
        `);
        pool.close();
        return r.recordset;
    }
}
