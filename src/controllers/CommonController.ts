import {SystemUser} from "../entities/SystemUser";
import {Db} from "../models/db";

export class CommonController {

    protected db = new Db();
    protected user = new SystemUser();

    protected async getUser(rut: string) {
        const user: SystemUser | undefined = await SystemUser.findOne(rut);
        if (user === undefined) {
            throw new Error("User not exists");
        }
        return user;
    }
}
