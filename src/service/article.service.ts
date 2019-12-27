import {getConnection} from "typeorm";
import {Db} from "../models/db";
import {SubsidiaryService} from "./subsidiary.service";

export class ArticleService {
  private db = new Db();

  /**
   * Search a article by sku or description name
   */
  public async getBySkuOrName(searchValue: string) {
    const conn = getConnection();
    const query = `exec searchArticleBySkuOrDescription '${searchValue}'`;
    return await conn.query(query);
  }

  /**
   * Search a article by sku or description name
   */
  public async getBySku(sku: string, isBulk: boolean, rut: string) {
    const subsidiary: number = await this.getSubsidiary(rut);
    const conn = getConnection();
    const query = `exec disponibleVenta '${sku}', ${isBulk}, ${subsidiary}`;
    const data = await conn.query(query);
    console.log(data[0]);
    return data[0];
    /*
    const pool = await this.db.poolPromise();
    try {
      const subsidiary: number = await this.getSubsidiary(rut);
      if (subsidiary > 0) {
        const r = await pool
          .request()
          .input("idArticulo", NVarChar(50), sku)
          .input("estado", Bit, isBulk)
          .input("idSucursal", TinyInt, subsidiary)
          .execute("disponibleVenta");
        console.log(r);
        return r.recordset.length > 0 ? r.recordset[0] : {};
      } else {
        return {};
      }
    } catch (err) {
      throw new InternalServerError(err.message);
    }
    */
  }

  public async getSubsidiary(rut: string) {
    const ds = new SubsidiaryService();
    let id: number = 0;
    const value = await ds.getAllByUser(rut);
    if (value) {
      id = value.filter((item: any) => item.selected === true)[0].idSucursal;
    }
    return id;
  }
}
