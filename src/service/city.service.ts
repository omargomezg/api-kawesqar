import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class CityService {
    private db = new Db();

    public async getAll() {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool
                .request()
                .query(`
                    select codigo, nombre
                    from comunas`);
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }
}
