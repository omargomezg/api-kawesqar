import { ConnectionPool } from "mssql";
import { Conn } from "../models/database";

export class SupplierService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getByRut(rut: string) {
        const pool = await this.sql.connect();
        const r = await pool.request().query(`SELECT ProvRut AS rut,
        ProvNombre AS razonSocial
        FROM proveedor
        WHERE ProvRut = dbo.formatearRut('${rut}')`);
        return r.recordset[0];
    }
}
