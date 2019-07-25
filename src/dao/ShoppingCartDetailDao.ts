import {InternalServerError} from "routing-controllers";
import {ShoppingCartDetailModel} from "../models/database/ShoppingCartDetail.model";
import {Db} from "../models/db";

export class ShoppingCartDetailDao {
    private db = new Db();

    public async save(data: ShoppingCartDetailModel) {
        const pool = await this.db.poolPromise();
        try {
            // TODO Ogomez Crear SP y guardar con un foreach
            const r = await pool.request().query(`
                insert into shoppingCart (rutUsuario, idSucursal, created, updated)
                values (dbo.formatearRut('${"typeof data"}'), ${data.amount}, GETDATE(), GETDATE());
            `);
            return r;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

}
