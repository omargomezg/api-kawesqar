import {Bit, ConnectionPool, Int, Money, NVarChar, TinyInt} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";

export class ShoppingCartService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async putTemporalCart(req: ITemporalCart) {
        const pool = await this.sql.connect();
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
        } finally {
            await pool.close();
        }
    }
}
