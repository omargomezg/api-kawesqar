import {NVarChar} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class HeaderService {
    private db = new Db();

    public async getByRut(rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rut", NVarChar(12), rut)
                .execute("dataHeaderByRut");
            await pool.close;
            return r.recordset[0];
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }
}
