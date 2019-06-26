import {ConnectionPool} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";

export class CityService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getAll() {
        const pool = await this.sql.connect();
        try {
            const r = await pool
                .request()
                .query(`
                    select codigo, nombre
                    from comunas`);
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }
}
