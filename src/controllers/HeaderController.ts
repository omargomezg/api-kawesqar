import {Get, JsonController, OnUndefined, Param} from "routing-controllers";
import { SystemUser } from "../entities/SystemUser";
import {UndefinedArrayError} from "../models/error/UndefinedArrayError";
import { RutUtils } from "../Utils/RutUtils";

@JsonController()
export class HeaderController {

    @Get("/header/:rut")
    @OnUndefined(UndefinedArrayError)
    public getByRut(@Param("rut") rut: string) {
        return SystemUser.findOne({
            relations: ["branch"],
            where: {
                rut: RutUtils.format(rut)
            }
        });
    }
}
