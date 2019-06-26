import {ConnectionPool} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";
import {IExistenceModel} from "../models/request/existence.model";

export class ExistenceService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getData(data: IExistenceModel) {
        const pool = await this.sql.connect();
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
                return r.recordset.filter((item) => {
                    return item.nomArticulo.toLowerCase().indexOf(`${data.name.toLowerCase()}`) > -1;
                });
            }
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }
}
