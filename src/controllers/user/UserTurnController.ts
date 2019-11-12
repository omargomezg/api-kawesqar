import {Get, JsonController, OnUndefined, Param} from "routing-controllers";
import { TurnoVenta } from "../../entities/TurnoVenta";
import { RutUtils } from "../../Utils/RutUtils";
import { CommonController } from "../CommonController";
import {UndefinedArrayError} from "../../models/error/UndefinedArrayError";

@JsonController("/user/turn")
export class UserTurnController extends CommonController {

    @Get("/:rut/:status")
    @OnUndefined(UndefinedArrayError)
    public async getOne(@Param("rut") rut: string, @Param("status") status: string) {
        const turn = await TurnoVenta.findOne({
            where: {
                isActive: status,
                systemUser: { rut: RutUtils.format(rut) }
            }
        });
        return turn === undefined ? {} : turn;
    }
}
