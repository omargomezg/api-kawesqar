import {Get, JsonController} from "routing-controllers";
import {Role} from "../entities/Role";
import {RoleRepository} from "../repository/RoleRepository";

@JsonController("/role")
export class RoleController {

    private static async createDefaultRoles(): Promise<Role[]> {
        const repository = new RoleRepository();
        const roleAdmin = new Role();
        roleAdmin.isActive = true;
        roleAdmin.name = "Administrador";
        roleAdmin.description = "Administrador de sistema";
        roleAdmin.accesoVenta = true;
        roleAdmin.valorDescuento = 80;
        roleAdmin.ventAdmin = true;
        await repository.createRole(roleAdmin);
        const roleUser = new Role();
        roleUser.isActive = true;
        roleUser.name = "Usuario";
        roleUser.description = "Usuario de sistema";
        roleUser.accesoVenta = true;
        roleUser.valorDescuento = 20;
        roleUser.ventAdmin = true;
        await repository.createRole(roleUser);
        return await Role.find();
    }

    @Get("")
    public async getRoles() {
        let roles = await Role.find();
        if (roles.length === 0) {
            roles = await RoleController.createDefaultRoles();
        }
        return roles;
    }
}
