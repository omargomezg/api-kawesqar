import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class EgressService {
    private db = new Db();

    public async getAll() {
        const pool = await this.db.poolPromise();
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
        }
    }
}
