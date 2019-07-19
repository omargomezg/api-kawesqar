import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";
import {IExistenceModel} from "../models/request/existence.model";

export class ExistenceService {
    private db = new Db();

    public async getData(data: IExistenceModel) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request().query(`
                select nomArticulo,
                       idArticulo,
                       artValor,
                       cantidad,
                       subTotal,
                       medida,
                       idBodega,
                       idSucursal
                from existenciaHoy
                where idBodega = isnull(${data.idBodega === 0 ? null : data.idBodega}, idBodega)
                  and idSucursal = ${data.idSucursal}
            `);
            if (data.name !== "") {
                return r.recordset.filter((item: any) => {
                    return item.nomArticulo.toLowerCase().indexOf(`${data.name.toLowerCase()}`) > -1;
                });
            }
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }
}
