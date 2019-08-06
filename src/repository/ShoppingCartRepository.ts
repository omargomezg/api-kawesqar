import {getManager} from "typeorm";
import {Product} from "../entities/Product";
import {ShoppingCart} from "../entities/ShoppingCart";

export class ShoppingCartRepository {
    public getByUser(rut: string): Promise<Product> {
        return getManager()
            .getRepository(ShoppingCart)
            .createQueryBuilder("shopping_cart")
            .where("shopping_cart.")
            .getMany();
    }
}
