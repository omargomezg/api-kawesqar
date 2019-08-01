import {InternalServerError} from "routing-controllers";
import {OutputFlowTypeDao} from "../dao/OutputFlowTypeDao";
import {OutputFlowTypeModel} from "../models/database/OutputFlowType.model";
import {Db} from "../models/db";

export class EgressService {
    private db = new Db();

    public async getAllByRut(rut: string): Promise<OutputFlowTypeModel[]> {
        const oftDao: OutputFlowTypeDao = new OutputFlowTypeDao();
        return oftDao.getFlowsByRut(rut);
    }

    public async getAll(): Promise<OutputFlowTypeModel[]> {
        let output: OutputFlowTypeModel[] = new Array<OutputFlowTypeModel>();
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request().query(`
                select idtVenta                  id,
                       RTRIM(LTRIM(descripcion)) name,
                       RTRIM(LTRIM(codigo))      code
                from tipoEgreso
            `);
            if (r.recordset.length > 0) {
                output = Object.assign([], r.recordset);
            }
        } catch (e) {
            throw new InternalServerError(e.message);
        }
        return output;
    }
}
