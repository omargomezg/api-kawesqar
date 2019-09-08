import { Body, Get, JsonController, OnUndefined, Param, Post } from "routing-controllers";
import { Store } from "../../entities/Store";
import { TurnoVenta } from "../../entities/TurnoVenta";
import { RutUtils } from "../../Utils/RutUtils";
import { CommonController } from "../CommonController";

@JsonController("/api/user/turn")
export class UserTurnController extends CommonController {

    @Get("/:rut/:status")
    public async getOne(@Param("rut") rut: string, @Param("status") status: string) {
        const turno = await TurnoVenta.findOne({
            where: {
                isActive: status,
                systemUser: { rut: RutUtils.format(rut) }
            }
        });
        return turno === undefined ? {} : turno;
    }
}
