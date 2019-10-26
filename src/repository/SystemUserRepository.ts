import {createQueryBuilder, EntityRepository, getConnection, getManager, Repository} from "typeorm";
import {SystemUser} from "../entities/SystemUser";
import {RutUtils} from "../Utils/RutUtils";

@EntityRepository()
export class SystemUserRepository extends Repository<SystemUser> {

    public async createUser(user: SystemUser) {
        const conn = getConnection();
        const query = `INSERT INTO cs_usuarios
                       (rut, firstName, lastName, secondLastName, email, clave, fechacreacion, userName,
                        salidaVenta, salidaFactura, salidaEmpleados, traspaso, credito)
                       VALUES ('${RutUtils.format(user.rut)}',
                               '${user.firstName}',
                               '${user.lastName}', '${user.secondLastName}',
                               '${user.email}',
                               PwdEncrypt('${user.password}'),
                               GETDATE(), '${user.userName}', 0, 0, 0, 0, 0)`;
        await conn.query(query);
        return getManager()
            .getRepository(SystemUser)
            .findOne(RutUtils.format(user.rut));
    }

    public getUser(rut: string) {
        return getManager()
            .getRepository(SystemUser)
            .findOne(rut);
    }

    public async getUserAndBranchs(rut: string) {
        return await createQueryBuilder("SystemUser")
            .innerJoinAndSelect("SystemUser.relationSystemUserBranch", "RelationSystemUserBranch")
            .innerJoinAndSelect("RelationSystemUserBranch.branch", "branches")
            .where("SystemUser.rut = :UserRut", {UserRut: rut})
            .getOne();
    }

    public async getUsersWithRole() {
        return await createQueryBuilder("SystemUser")
            .innerJoinAndSelect("SystemUser.relacionUsuarioRols", "RelationSystemUserRole")
            .innerJoinAndSelect("RelationSystemUserRole.idRol", "Role")
            .getMany();
    }
}
