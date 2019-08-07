import {getManager} from "typeorm";
import {Product} from "../entities/Product";
import {ShoppingCart} from "../entities/ShoppingCart";

export class ShoppingCartRepository {
    public getByUser(rut: string): Promise<ShoppingCart[]> {
        const params = {
            rut: "qwqw"
        };
        params.rut = rut;
        return getManager()
            .getRepository(ShoppingCart)
            .createQueryBuilder("shopping_cart")
            .where("shopping_cart.systemUserRut = :rut", params)
            .getMany();
    }

    public create(rut: string): Promise<ShoppingCart> {
        const data = new ShoppingCart();
        data.systemUser.rut = rut;
        console.log("rut : ", JSON.stringify(data));
        return getManager()
            .getRepository(ShoppingCart)
            .save(data);
    }
}
