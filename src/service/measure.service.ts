import {ConnectionPool} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";

export class MeasureService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getAll() {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request().query(`
                select IdMedida  as id,
                       NomMedida as nombre,
                       nomPlural as nombrePlural,
                       lastupdate
                from dbo.medidas
                order by lastupdate desc`);
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }
}
