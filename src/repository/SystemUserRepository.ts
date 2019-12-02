import {createQueryBuilder, EntityRepository, getConnection, getManager, Repository} from "typeorm";
import {SystemUser} from "../entities/SystemUser";
import {RutUtils} from "../Utils/RutUtils";

@EntityRepository()
export class SystemUserRepository extends Repository<SystemUser> {

    public async getMenu(rut: string) {
        return await createQueryBuilder("Menu")
            .innerJoin("Menu.userMenus", "UserMenu")
            .where("UserMenu.systemUser = :rut", {rut: RutUtils.format(rut)})
            .getMany();
    }

    public async getMenuChildes(rut: string, parent: number) {
        return await createQueryBuilder("Menu")
            .innerJoin("Menu.userMenus", "UserMenu")
            .where("UserMenu.systemUser = :rut", {rut: RutUtils.format(rut)})
            .andWhere(`Menu.parent = ${parent}`)
            .getMany();
    }

    public async createUser(user: SystemUser) {
        const conn = getConnection();
        const query = `exec mantenedorUsuario '${RutUtils.format(user.rut)}',
                                           '${user.firstName}',
                                           '${user.lastName}', '${user.secondLastName}',
                                           '${user.password}',
                                           '${user.userName}',
                                           '${user.email}'`;
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

    public async getUserWithRoles(rut: string) {
        return await createQueryBuilder("SystemUser")
            .innerJoinAndSelect("SystemUser.relationSystemUserRoles", "RelationSystemUserRole")
            .innerJoinAndSelect("RelationSystemUserRole.role", "Role")
            .where("SystemUser.rut = :rut", {rut: RutUtils.format(rut)})
            .getOne();
    }

    public async getUserAndBranches(rut: string) {
        return await createQueryBuilder("SystemUser")
            .innerJoinAndSelect("SystemUser.relationSystemUserBranch", "RelationSystemUserBranch")
            .innerJoinAndSelect("RelationSystemUserBranch.branch", "branches")
            .where("SystemUser.rut = :UserRut", {UserRut: rut})
            .getOne();
    }

    public async getUsersWithRole() {
        return await createQueryBuilder("SystemUser")
            .innerJoinAndSelect("SystemUser.relationSystemUserRoles", "RelationSystemUserRole")
            .innerJoinAndSelect("RelationSystemUserRole.role", "Role")
            .getMany();
    }
}
