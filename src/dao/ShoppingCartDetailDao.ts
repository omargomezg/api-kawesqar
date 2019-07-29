import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class ShoppingCartDetailDao {
    private db = new Db();

    public async getByRut(rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request().query(`
                select tempCarro.id, tempCarro.idArticulo As sku, cantidad As quantity,
                nomArticulo As name, valor As amount,
                'bulk' = tempCarro.estado, idArticuloID
                from tempCarro inner join articulos on articulos.idArticulo = tempCarro.idArticulo
                where rutUsuario = dbo.formatearRut('${rut}');
            `);
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    /*public async save(data: ShoppingCartDetailModel[]) {
        const pool = await this.db.poolPromise();
        try {
            // TODO Ogomez Crear SP y guardar con un foreach
            data.forEach((item) => {
                pool.request().query(`
                insert into tempCarro (rutUsuario, idSucursal, created, updated)
                values (dbo.formatearRut('${"typeof data"}'), ${data.amount}, GETDATE(), GETDATE());
            `);
            });
            return r;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }*/

}
