import {Get, JsonController, OnUndefined, Param} from "routing-controllers";
import {createQueryBuilder} from "typeorm";
import { SystemUser } from "../entities/SystemUser";
import {TurnStatusEnum} from "../models/enum/TurnStatusEnum";
import {UndefinedArrayError} from "../models/error/UndefinedArrayError";
import { RutUtils } from "../Utils/RutUtils";

@JsonController()
export class HeaderController {

    @Get("/header/:rut")
    @OnUndefined(UndefinedArrayError)
    public async getByRut(@Param("rut") rut: string) {
        return await createQueryBuilder("SystemUser")
            .innerJoinAndSelect("SystemUser.turnoVenta", "TurnoVenta")
            .where(`SystemUser.rut = '${RutUtils.format(rut)}'`)
            .andWhere(`TurnoVenta.isActive = '${TurnStatusEnum.OPEN}'`)
            .getOne();
        /*return SystemUser.findOne({
            relations: ["branch", "turnoVenta"],
            where: {
                rut: RutUtils.format(rut),
                turnoVenta: [ turnoVenta.isActive: TurnStatusEnum.OPEN]
            }
        });*/
    }
}
