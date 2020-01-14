import {Get, JsonController, OnUndefined, Param, Post} from "routing-controllers";
import {TurnoVenta} from "../../entities/TurnoVenta";
import {TurnStatusEnum} from "../../models/enum/TurnStatusEnum";
import {UndefinedArrayError} from "../../models/error/UndefinedArrayError";
import {RutUtils} from "../../Utils/RutUtils";
import {CommonController} from "../CommonController";

@JsonController("/user/turn")
export class UserTurnController extends CommonController {

    @Post("/")
    public async openAndCloseTurn() {
        console.log(TurnStatusEnum.CLOSED);
        return {};
    }

    @Get("/:rut/:status")
    @OnUndefined(UndefinedArrayError)
    public async getOne(@Param("rut") rut: string, @Param("status") status: string) {
        const turn = await TurnoVenta.findOne({
            where: {
                isActive: status,
                systemUser: {rut: RutUtils.format(rut)}
            }
        });
        return turn === undefined ? {} : turn;
    }

}
