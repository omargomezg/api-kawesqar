import {Bit, NVarChar, TinyInt} from "mssql";
import {InternalServerError} from "routing-controllers";
import { Db } from "../models/db";
export class ArticleService {
     private db = new Db();

    /**
     * Search a article by sku or description name
     */
    public async getBySkuOrName(searchValue: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("textSearch", NVarChar(50), searchValue)
                .execute("searchArticleBySkuOrDescription");
            return r.recordset;
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    /**
     * Search a article by sku or description name
     */
    public async getBySku(searchValue: string, isBulk: boolean, idSubsidiary: number) {
        const pool = await this.db.poolPromise();
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
