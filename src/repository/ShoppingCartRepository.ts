import { EntityManager, EntityRepository, getManager } from "typeorm";
import { ShoppingCart } from "../entities/ShoppingCart";

@EntityRepository(ShoppingCart)
export class ShoppingCartRepository {
    constructor(private manager: EntityManager) {
    }
    public async getByUser(rut: string) {
        const param = {
            rut
        };
        return this.manager
            .createQueryBuilder(ShoppingCart, "shoppingCart")
            .where("shoppingCart.systemUserRut = :rut", param)
            .getOne();
    }

    public create(shoppingCart: ShoppingCart) {
        return getManager()
            .getRepository(ShoppingCart)
            .save(shoppingCart);
    }

}
