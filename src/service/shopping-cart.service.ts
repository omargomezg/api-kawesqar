import {Bit, Int, Money, NVarChar, TinyInt} from "mssql";
import {InternalServerError} from "routing-controllers";
import {ShoppingCartDao} from "../dao/ShoppingCartDao";
import {ShoppingCartModel} from "../models/database/ShoppingCart.model";
import {SubsidiaryModel} from "../models/database/Subsidiary.model";
import {UserModel} from "../models/database/User.model";
import {Db} from "../models/db";
import {ArticleService} from "./article.service";

export class ShoppingCartService {
    private db = new Db();

    public async get(id: number, rut: string) {
        const shoppingCartDao: ShoppingCartDao = new ShoppingCartDao();
        const articleService: ArticleService = new ArticleService();
        const model: ShoppingCartModel = new ShoppingCartModel();
        const user: UserModel = new UserModel();
        const subsidiary: SubsidiaryModel = new SubsidiaryModel();
        model.id = id;
        model.user = user;
        model.subsidiary = subsidiary;
        const idSubsidiary: number = await articleService.getSubsidiary(rut);
        if (model.id === 0) {
            const savedSC = await shoppingCartDao.save(rut, idSubsidiary);
            model.id = savedSC.recordset[0].id;
        } else {
            model.id = id;
        }
        const getSC = await shoppingCartDao.getById(Number(model.id));
        model.user.rut = getSC.recordset[0].rutUsuario;
        model.subsidiary.id = getSC.recordset[0].idSucursal;
        return model;
    }

    public async branchTransfer(data: any) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rutUsuario", NVarChar(12), data.rut)
                .input("idSucursalDestino", TinyInt(), data.subsidiaryTo)
                .input("idSucursal", TinyInt(), data.subsidiaryFrom)
                .execute("enviarOtraSucursal");
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    public async putTemporalCart(req: ITemporalCart, rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rutUsuario", NVarChar(12), rut)
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
