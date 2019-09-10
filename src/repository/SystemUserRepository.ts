import { createQueryBuilder, EntityRepository, getManager, Repository } from "typeorm";
import { ShoppingCart } from "../entities/ShoppingCart";
import { SystemUser } from "../entities/SystemUser";

@EntityRepository()
export class SystemUserRepository extends Repository<SystemUser> {
    public getUser(rut: string) {
        return getManager()
            .getRepository(SystemUser)
            .findOne(rut);
    }
    public async getUserAndBranchs(rut: string) {
        return await createQueryBuilder("SystemUser")
            .innerJoinAndSelect("SystemUser.relationSystemUserBranch", "RelationSystemUserBranch")
            .innerJoinAndSelect("RelationSystemUserBranch.branch", "branches")
            .where("SystemUser.rut = :UserRut", { UserRut: rut })
            .getOne();
    }

    public async getUsersWithRole() {
        return await createQueryBuilder("SystemUser")
            .innerJoinAndSelect("SystemUser.relacionUsuarioRols", "RelationSystemUserRole")
            .innerJoinAndSelect("RelationSystemUserRole.idRol", "Role")
            .getMany();
    }
}
