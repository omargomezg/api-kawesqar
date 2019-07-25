import {Bit, Int, Money, NVarChar, TinyInt} from "mssql";
import {InternalServerError} from "routing-controllers";
import {isBoolean} from "util";
import {ShoppingCartDao} from "../dao/ShoppingCartDao";
import {ShoppingCartModel} from "../models/database/ShoppingCart.model";
import {SubsidiaryModel} from "../models/database/Subsidiary.model";
import {UserModel} from "../models/database/User.model";
import {Db} from "../models/db";
import {ArticleService} from "./article.service";

export class ShoppingCartService {
    private db = new Db();
    private articleService: ArticleService = new ArticleService();

    public async get(id: number, rut: string) {
        const shoppingCartDao: ShoppingCartDao = new ShoppingCartDao();
        const model: ShoppingCartModel = new ShoppingCartModel();
        const user: UserModel = new UserModel();
        const subsidiary: SubsidiaryModel = new SubsidiaryModel();
        model.id = id;
        model.user = user;
        model.subsidiary = subsidiary;
        const idSubsidiary: number = await this.articleService.getSubsidiary(rut);
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

    public async putTemporalCart(cartModel: ShoppingCartModel, rut: string, id: number, sku: string, bulk: number) {
        const isBulk: boolean = bulk === 1;
        const quantity: number = 0;
        const pool = await this.db.poolPromise();
        try {
            // Get subsidiary
            const subsidiary: number = await this.articleService.getSubsidiary(rut);
            if (subsidiary ===  0 ) {
                throw new EvalError("No subsidiary active");
            }
            const availableArticles = await pool.request()
                .input("idArticulo", NVarChar(50), sku)
                .input("estado", Bit, isBulk)
                .input("idSucursal", TinyInt, subsidiary)
                .execute("disponibleVenta");
            if (availableArticles.recordset.length === 0 ) {
                throw new EvalError("No available articles");
            }
            if (cartModel.detail.filter((item) => item.id))
            cartModel.detail.forEach((item) => {

            })
            cartModel.detail.forEach()
            return r.recordset.length > 0 ? r.recordset[0] : {};
            const r = await pool.request()
                .input("rutUsuario", NVarChar(12), rut)
                .input("IdArticulo", NVarChar(50), cartModel.sku)
                .input("Cantidad", Int, cartModel.quantity)
                .input("total", Money, cartModel.total)
                .input("id", Int, cartModel.id)
                .input("idArticuloID", Int, cartModel.idArticuloID)
                .input("estado", Bit, cartModel.estado)
                .input("idSucursal", TinyInt, cartModel.idSucursal)
                .input("idSucursalDestino", TinyInt, cartModel.idSucursalDestino)
                .execute("ProcTempCarro");
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }
}
