import {Bit, Int, Money, NVarChar, TinyInt} from "mssql";
import {InternalServerError} from "routing-controllers";
import {OutputFlowTypeDao} from "../dao/OutputFlowTypeDao";
import {ShoppingCartDao} from "../dao/ShoppingCartDao";
import {ShoppingCartDetailDao} from "../dao/ShoppingCartDetailDao";
import {ShoppingCartModel} from "../models/database/ShoppingCart.model";
import {ShoppingCartDetailModel} from "../models/database/ShoppingCartDetail.model";
import {DisponibleVentaModel} from "../models/database/storedprocedure/disponibleVenta.model";
import {SubsidiaryModel} from "../models/database/Subsidiary.model";
import {UserModel} from "../models/database/User.model";
import {Db} from "../models/db";
import {ArticleService} from "./article.service";

export class ShoppingCartService {
    private db = new Db();
    private articleService: ArticleService = new ArticleService();
    private shoppingCartDetailDao: ShoppingCartDetailDao = new ShoppingCartDetailDao();

    public async get(id: number, rut: string) {
        const shoppingCartDao: ShoppingCartDao = new ShoppingCartDao();
        const outputFlowTypeDao: OutputFlowTypeDao = new OutputFlowTypeDao();
        const model: ShoppingCartModel = new ShoppingCartModel();
        const user: UserModel = new UserModel();
        const subsidiary: SubsidiaryModel = new SubsidiaryModel();
        model.id = id;
        model.user = user;
        model.subsidiaryFrom = subsidiary;
        const idSubsidiary: number = await this.articleService.getSubsidiary(rut);
        model.subsidiaryFrom.id = idSubsidiary;
        if (model.id === 0) {
            const savedSC = await shoppingCartDao.save(rut, idSubsidiary);
            model.id = savedSC.recordset[0].id;
        } else {
            model.id = id;
        }
        model.detail = await this.shoppingCartDetailDao.getByRut(rut);
        model.flow = await outputFlowTypeDao.getDefaultFlowByRut(rut);
        const getSC = await shoppingCartDao.getById(Number(model.id));
        model.user.rut = getSC.recordset[0].rutUsuario;
        model.created = getSC.recordset[0].created;
        model.updated = getSC.recordset[0].updated;
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

    public async delItemFromTemporalCart(rut: string, id: number, req: ShoppingCartModel) {
        if (req.detail.filter((item) => item.id === id).length === 0) {
            throw new EvalError("Id is not present");
        }
        const pool = await this.db.poolPromise();
        try {
        const r = await pool.request()
            .input("id", Int(), id)
            .input("rutUsuario", NVarChar(12), rut)
            .execute("limpiarRegistroCarroVenta");
        req.detail = req.detail.filter((item) => {
            return item.id !== id;
        });
        return req;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    public async putTemporalCart(cartModel: ShoppingCartModel, rut: string, id: number, sku: string, bulk: number) {
        const isBulk: boolean = bulk === 1;
        let disponibleVenta: DisponibleVentaModel = new DisponibleVentaModel();
        const quantity: number = 0;
        const pool = await this.db.poolPromise();
        // Get subsidiary
        const subsidiary: number = await this.articleService.getSubsidiary(rut);
        if (subsidiary === 0) {
            throw new EvalError("No subsidiary active");
        }
        cartModel.subsidiaryFrom.id = subsidiary;
        const availableArticles = await pool.request()
            .input("idArticulo", NVarChar(50), sku)
            .input("estado", Bit, isBulk)
            .input("idSucursal", TinyInt, subsidiary)
            .execute("disponibleVenta");
        if (availableArticles.recordset.length === 0) {
            throw new EvalError("No available articles");
        }
        disponibleVenta = Object.assign(new DisponibleVentaModel(), availableArticles.recordset[0]);

        if (cartModel.detail.filter((item) => item.sku === sku).length === 0) {
            const newDetail: ShoppingCartDetailModel = new ShoppingCartDetailModel();
            newDetail.sku = sku;
            newDetail.id = disponibleVenta.idRegistro;
            newDetail.amount = disponibleVenta.ValorUnitario;
            newDetail.name = disponibleVenta.Nombre;
            cartModel.detail.push(newDetail);
        }
        cartModel.detail.forEach((item) => {
            if (item.sku === sku) {
                item.quantity++;
                item.amount = disponibleVenta.ValorUnitario * item.quantity;
                try {
                    const r = pool.request()
                        .input("rutUsuario", NVarChar(12), rut)
                        .input("IdArticulo", NVarChar(50), item.sku)
                        .input("Cantidad", Int, item.quantity)
                        .input("total", Money, item.amount)
                        .input("id", Int, cartModel.id)
                        .input("idArticuloID", Int, item.id)
                        .input("estado", Bit, bulk)
                        .input("idSucursal", TinyInt, cartModel.subsidiaryFrom.id)
                        .input("idSucursalDestino", TinyInt, cartModel.subsidiaryTo.id)
                        .execute("ProcTempCarro");
                } catch (e) {
                    throw new InternalServerError(e.message);
                }
            }
        });
        return cartModel;
    }
}
