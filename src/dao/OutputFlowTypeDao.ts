import {InternalServerError} from "routing-controllers";
import {OutputFlowTypeModel} from "../models/database/OutputFlowType.model";
import {Db} from "../models/db";

export class OutputFlowTypeDao {
    private db = new Db();

    public async getDefaultFlowByRut(rut: string): Promise<OutputFlowTypeModel> {
        const pool = await this.db.poolPromise();
        let data: OutputFlowTypeModel;
        const r = await pool.request().query(`
                select top (1)  tipoEgreso.idtVenta As id, tipoEgreso.descripcion as name,
                tipoEgreso.codigo as code
                from tipoEgreso inner join tipoEgreso_Usuario tEU on tipoEgreso.idtVenta = tEU.idtVenta
                where tEU.rutUsuario = dbo.formatearRut(${rut}) and tEU.selDefault = 1;
            `);
        data = Object.assign(new OutputFlowTypeModel(), r.recordset[0]);
        return data;
    }

    public async getFlowsByRut(rut: string): Promise<OutputFlowTypeModel[]> {
        const pool = await this.db.poolPromise();
        let output: OutputFlowTypeModel[] = new Array<OutputFlowTypeModel>();
        try {
            const r = await pool.request().query(`
                select tipoEgreso.idtVenta As id, tipoEgreso.descripcion as name,
                tipoEgreso.codigo as code,
                tEU.selDefault as isDefault
                from tipoEgreso inner join tipoEgreso_Usuario tEU on tipoEgreso.idtVenta = tEU.idtVenta
                where tEU.rutUsuario = dbo.formatearRut(${rut});
            `);
            output = Object.assign([], r.recordset);
        } catch (e) {
            throw new InternalServerError(e.message);
        }
        return output;
    }
}
