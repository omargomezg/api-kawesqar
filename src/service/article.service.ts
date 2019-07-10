import {Bit, ConnectionPool, NVarChar, TinyInt} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";

export class ArticleService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    /**
     * Search a article by sku or description name
     */
    public async getBySkuOrName(searchValue: string) {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request()
                .input("textSearch", NVarChar(50), searchValue)
                .execute("searchArticleBySkuOrDescription");
            return r.recordset;
        } catch (err) {
            throw new InternalServerError(err.message);
        } finally {
            await pool.close();
        }
    }

    /**
     * Search a article by sku or description name
     */
    public async getBySku(searchValue: string, isBulk: boolean, idSubsidiary: number) {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request()
                .input("idArticulo", NVarChar(50), searchValue)
                .input("estado", Bit, isBulk)
                .input("idSucursal", TinyInt, idSubsidiary)
                .execute("disponibleVenta");
            return r.recordset[0];
        } catch (err) {
            throw new InternalServerError(err.message);
        } finally {
            await pool.close();
        }
    }
}
