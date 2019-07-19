import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class RoleService {
    private db = new Db();

    public async getList() {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request().query(`
                select idRol,
                       titulo,
                       descripcion,
                       estado,
                       accesoVenta,
                       valorDescuento,
                       ventAdmin,
                       isDefault
                FROM dbo.cs_rol
            `);
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }
}
