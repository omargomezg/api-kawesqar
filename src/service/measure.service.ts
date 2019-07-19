import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class MeasureService {
    private db = new Db();

    public async getAll() {
        const pool = await this.db.poolPromise();
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
        }
    }
}
