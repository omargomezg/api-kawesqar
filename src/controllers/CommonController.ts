import {UnauthorizedError} from "routing-controllers";
import {SystemUser} from "../entities/SystemUser";
import {Db} from "../models/db";
import {RutUtils} from "../Utils/RutUtils";

export class CommonController {
  protected db = new Db();
  protected user = new SystemUser();
  protected rutUtils = new RutUtils();

  protected async getUser(rut: string) {
    console.log("Consultado rut " + rut);
    const user: SystemUser | undefined = await SystemUser.findOne(
      RutUtils.format(rut)
    );
    if (user === undefined) {
      throw new UnauthorizedError("User not exists");
    }
    return user;
  }
}
