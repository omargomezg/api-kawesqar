import {JsonController, Put} from "routing-controllers";
import {ShoppingCartService} from "../service/shopping-cart.service";

@JsonController("/api/shopping-cart")
export class ShoppingCartController {

    @Put("/")
    public getRoles(req: ITemporalCart) {
        const cart = new ShoppingCartService();
        return cart.putTemporalCart(req);
    }
}
