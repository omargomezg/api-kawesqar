import {getManager} from "typeorm";
import {ShoppingCart} from "../entities/ShoppingCart";
import {SystemUser} from "../entities/SystemUser";

export class SystemUserRepository {
    public getUser(rut: string) {
        return getManager()
            .getRepository(SystemUser)
            .findOne(rut);
    }
}
