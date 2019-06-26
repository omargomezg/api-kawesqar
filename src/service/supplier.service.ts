import {ConnectionPool} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";

export class SupplierService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getByRut(rut: string) {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request()
                .query(`
                    select ProvRut AS rut,
                           ProvNombre AS businessName
                    from proveedor
                    where ProvRut = dbo.formatearRut('${rut}')`);
            return r.recordset[0];
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }
}
