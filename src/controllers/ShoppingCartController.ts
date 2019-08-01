import {Body, Delete, Get, JsonController, Param, Put} from "routing-controllers";
import {ShoppingCartModel} from "../models/database/ShoppingCart.model";
import {ShoppingCartService} from "../service/shopping-cart.service";

@JsonController("/api/shopping-cart")
export class ShoppingCartController {
    public cart = new ShoppingCartService();

    @Get("/:id/:rut")
    public get(@Param("id") id: number, @Param("rut") rut: string) {
        return this.cart.get(id, rut);
    }

    @Put("/:id/:rut")
    public save(@Param("id") id: number, @Param("rut") rut: string, @Body() req: ShoppingCartModel) {
        //  if (req.flow.code) {} else {}
        return {};
    }

    @Put("/:id/:rut/:sku/:bulk")
    public putTemporalCart(@Param("id") id: number, @Param("rut") rut: string, @Param("sku") sku: string,
                           @Param("bulk") bulk: number, @Body() req: ShoppingCartModel) {
        return this.cart.putTemporalCart(req, rut, id, sku, bulk);
    }

    @Delete("/:id/:rut")
    public delItemFromTemporalCart(@Param("id") id: number, @Param("rut") rut: string, @Body() req: ShoppingCartModel) {
        return this.cart.delItemFromTemporalCart(rut, id, req);
    }

    @Put("/branch-transfer")
    public branchTransfer(@Body() data: any) {
        return this.cart.branchTransfer(data);
    }
}
