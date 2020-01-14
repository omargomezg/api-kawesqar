import {createQueryBuilder, EntityRepository, getConnection, Repository} from "typeorm";
import {TurnoVenta} from "../entities/TurnoVenta";
import {TurnStatusEnum} from "../models/enum/TurnStatusEnum";

@EntityRepository()
export class TurnoVentaRepository extends Repository<TurnoVenta> {

    public getTurnoById(): TurnoVenta {
        return new TurnoVenta();
    }

    /**
     * Create new turn
     * @param rut
     * @param status
     */
    public putTurn(rut: string, status: TurnStatusEnum): TurnoVenta {
        return new TurnoVenta();
    }

    /**
     * Create a new user turn
     * @param rut
     */
    public async createUserTurn(rut: string) {
        const quantity = await this.countOpenTurn(rut);
        if (quantity === 0) {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(TurnoVenta)
                .values({
                    inicioTurno: new Date(),
                    isActive: TurnStatusEnum.OPEN,
                    userRut: rut
                })
                .execute();
            return TurnoVenta.findOne({
                where: {
                    id: result.identifiers[0].id
                }
            });
        } else {
            return TurnoVenta.findOne({
                where: {
                    isActive: TurnStatusEnum.OPEN,
                    userRut: rut
                }
            });
        }
    }

    public async countOpenTurn(rut: string): Promise<number> {
        return await createQueryBuilder("TurnoVenta")
            .where("TurnoVenta.userRut = :userRut", {userRut: rut})
            .andWhere("TurnoVenta.isActive = :isActive",
                {isActive: TurnStatusEnum.OPEN})
            .getCount();
    }

}
