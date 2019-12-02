import { EntityRepository, getManager, Repository } from "typeorm";
import { Role } from "../entities/Role";

@EntityRepository()
export class RoleRepository extends Repository<Role> {
    public async createRole(role: Role) {
        await getManager()
            .getRepository(Role)
            .save(role);
    }
}
