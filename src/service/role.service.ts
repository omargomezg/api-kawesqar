import {ConnectionPool} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";

export class RoleService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getList() {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request().query(`
                select idRol,
                       titulo,
                       descripcion,
                       estado,
                       accesoVenta,
                       valorDescuento,
                       ventAdmin,
                       isDefault
                FROM dbo.cs_rol
            `);
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }
}
