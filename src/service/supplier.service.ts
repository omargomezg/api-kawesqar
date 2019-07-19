import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class SupplierService {
    private db = new Db();

    public async getByRut(rut: string) {
        const pool = await this.db.poolPromise();
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
        }
    }
}
