import { UnauthorizedError } from "routing-controllers";
import { SystemUser } from "../entities/SystemUser";
import { Db } from "../models/db";
import { RutUtils } from "../utils/RutUtils";

export class CommonController {
  protected db = new Db();
  protected user = new SystemUser();

  protected async getUser(rut: string) {
    const user: SystemUser | undefined = await SystemUser.findOne(
      RutUtils.format(rut)
    );
    if (user === undefined) {
      throw new UnauthorizedError("User not exists");
    }
    return user;
  }
}
