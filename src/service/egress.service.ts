import {ConnectionPool} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";

export class EgressService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getAll() {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request().query(`
                select idtVenta                  id,
                       RTRIM(LTRIM(descripcion)) descripcion,
                       RTRIM(LTRIM(codigo))      codigo
                from tipoEgreso
            `);
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }
}
