import {Body, Get, JsonController, Param, Put} from "routing-controllers";
import {ShoppingCartService} from "../service/shopping-cart.service";

@JsonController("/api/shopping-cart")
export class ShoppingCartController {
    public cart = new ShoppingCartService();

    @Get("/:id")
    public get(@Param("id") id: number) {
        return "hola " + id;
    }

    @Put("/:id/:rut")
    public putTemporalCart(@Param("id") id: number, @Param("rut") rut: string, @Body() req: ITemporalCart) {
        return this.cart.putTemporalCart(req, rut);
    }

    @Put("/branch-transfer")
    public branchTransfer(@Body() data: any) {
        return this.cart.branchTransfer(data);
    }
}
