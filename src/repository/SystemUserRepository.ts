import {
  createQueryBuilder,
  EntityRepository,
  getConnection,
  getManager,
  Repository
} from "typeorm";
import { RelationSystemUserOutputType } from "../entities/RelationSystemUserOutputType";
import { RelationSystemUserRole } from "../entities/RelationSystemUserRole";
import { SystemUser } from "../entities/SystemUser";
import { RutUtils } from "../Utils/RutUtils";

@EntityRepository()
export class SystemUserRepository extends Repository<SystemUser> {
  public async getMenu(rut: string) {
    return await createQueryBuilder("Menu")
      .innerJoin("Menu.userMenus", "UserMenu")
      .where("UserMenu.systemUser = :rut", { rut: RutUtils.format(rut) })
      .getMany();
  }

  public async getMenuChildes(rut: string, parent: number) {
    return await createQueryBuilder("Menu")
      .innerJoin("Menu.userMenus", "UserMenu")
      .where("UserMenu.systemUser = :rut", { rut: RutUtils.format(rut) })
      .andWhere(`Menu.parent = ${parent}`)
      .getMany();
  }

  public async updateUser(user: SystemUser) {
    await createQueryBuilder()
      .update(SystemUser)
      .set({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        telephone: user.telephone
      })
      .where("rut = :rut", { rut: user.rut })
      .execute();
    if (user.relationSystemUserRoles != null) {
      for (const relation of user.relationSystemUserRoles) {
        await createQueryBuilder()
          .update(RelationSystemUserRole)
          .set({
            isActive: relation.isActive,
            role: relation.role,
            user: user
          })
          .where("id = :id", { id: relation.id })
          .execute();
      }
    }
    if (user.relationSystemUserOutputType != null) {
      for (const relation of user.relationSystemUserOutputType) {
        await createQueryBuilder()
          .update(RelationSystemUserOutputType)
          .set({
            isActive: relation.isActive,
            isDefault: relation.isDefault
          })
          .where(`id = ${relation.id}`)
          .execute();
      }
    }
    return user;
  }

  public async createUser(user: SystemUser) {
    const conn = getConnection();
    const query = `exec mantenedorUsuario '${RutUtils.format(user.rut)}',
                                           '${user.firstName}',
                                           '${user.lastName}',
                                           '${user.secondLastName}',
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
      .innerJoinAndSelect(
        "SystemUser.relationSystemUserRoles",
        "RelationSystemUserRole"
      )
      .innerJoinAndSelect("RelationSystemUserRole.role", "Role")
      .innerJoinAndSelect(
        "SystemUser.relationSystemUserOutputType",
        "RelationSystemUserOutputType"
      )
      .innerJoinAndSelect(
        "RelationSystemUserOutputType.outputType",
        "OutputType"
      )
      .where("SystemUser.rut = :rut", { rut: RutUtils.format(rut) })
      .getOne();
  }

  public async getUserAndBranches(rut: string) {
    return await createQueryBuilder("SystemUser")
      .innerJoinAndSelect(
        "SystemUser.relationSystemUserBranch",
        "RelationSystemUserBranch"
      )
      .innerJoinAndSelect("RelationSystemUserBranch.branch", "branches")
      .where("SystemUser.rut = :UserRut", { UserRut: rut })
      .getOne();
  }

  public async getUsersWithRole() {
    return await createQueryBuilder("SystemUser")
      .innerJoinAndSelect(
        "SystemUser.relationSystemUserRoles",
        "RelationSystemUserRole"
      )
      .innerJoinAndSelect("RelationSystemUserRole.role", "Role")
      .getMany();
  }
}
