import {BadRequestError, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import {createQueryBuilder, getConnection} from "typeorm";
import {TurnoVenta} from "../entities/TurnoVenta";
import {TurnStatusEnum} from "../models/enum/TurnStatusEnum";
import {UndefinedArrayError} from "../models/error/UndefinedArrayError";
import {TurnoVentaRepository} from "../repository/TurnoVentaRepository";
import {RutUtils} from "../Utils/RutUtils";
import {CommonController} from "./CommonController";

@JsonController("/turn")
export class UserTurnController extends CommonController {

    @Post("/:rut/:status")
    public async openAndCloseTurn(@Param("rut") rut: string, @Param("status") turnStatusEnum: string) {
        rut = RutUtils.format(rut);
        let result: any;
        const exists = await createQueryBuilder("TurnoVenta")
            .where("TurnoVenta.userRut = :userRut", {userRut: rut})
            .andWhere("TurnoVenta.isActive = :isActive",
                {isActive: turnStatusEnum === TurnStatusEnum.CLOSED ? TurnStatusEnum.OPEN : TurnStatusEnum.CLOSED})
            .getCount();
        if (turnStatusEnum === TurnStatusEnum.CLOSED) {
            if (exists > 0) {
                result = await getConnection()
                    .createQueryBuilder()
                    .update(TurnoVenta)
                    .set({isActive: TurnStatusEnum.CLOSED, finTurno: new Date().toISOString()})
                    .where("userRut = :userRut", {userRut: rut})
                    .andWhere("isActive = :isActive", {isActive: TurnStatusEnum.OPEN})
                    .execute();
            } else {
                return {};
            }
        } else if (turnStatusEnum === TurnStatusEnum.OPEN) {
            if (exists === 0) {
                result = await getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(TurnoVenta)
                    .values({
                        inicioTurno: new Date(),
                        isActive: TurnStatusEnum.OPEN,
                        userRut: rut
                    })
                    .execute();
            }
        } else {
            throw new BadRequestError("undefined status");
        }
        return result;
    }

    @Put("/:rut/:status")
    public async createNewTurn(@Param("rut") rut: string, @Param("status") turnStatusEnum: string) {
        rut = RutUtils.format(rut);
        this.getUser(rut);
        const repository = new TurnoVentaRepository();
        return repository.createUserTurn(rut);
    }

    @Get("/:rut/:status")
    @OnUndefined(UndefinedArrayError)
    public async getOne(@Param("rut") rut: string, @Param("status") turnStatusEnum: TurnStatusEnum) {
        if (!Object.values(TurnStatusEnum).includes(turnStatusEnum)) {
            throw new BadRequestError("undefined status");
        }
        const turn = await TurnoVenta.findOne({
            where: {
                isActive: turnStatusEnum,
                systemUser: {rut: RutUtils.format(rut)}
            }
        });
        return turn === undefined ? {} : turn;
    }

}
