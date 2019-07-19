import {Bit, Int, Money, NVarChar, TinyInt} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class ShoppingCartService {
    private db = new Db();

    public async putTemporalCart(req: ITemporalCart) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rutUsuario", NVarChar(12), req.rut)
                .input("IdArticulo", NVarChar(50), req.sku)
                .input("Cantidad", Int, req.quantity)
                .input("total", Money, req.total)
                .input("id", Int, req.id)
                .input("idArticuloID", Int, req.idArticuloID)
                .input("estado", Bit, req.estado)
                .input("idSucursal", TinyInt, req.idSucursal)
                .input("idSucursalDestino", TinyInt, req.idSucursalDestino)
                .execute("ProcTempCarro");
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }
}
