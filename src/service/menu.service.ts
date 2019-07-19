import {Int, NVarChar} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class MenuService {
    private db = new Db();

    public async getRoot(rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rut", NVarChar(12), rut)
                .input("parent", Int, -1)
                .execute("PA_GET_MenuByUser");
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    public async getChild(rut: string, id: number) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rut", NVarChar(12), rut)
                .input("parent", Int, id)
                .execute("PA_GET_MenuByUser");
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }
}
