import { Get, JsonController, Param } from "routing-controllers";
import { Role } from "../entities/Role";
import { RoleRepository } from "../repository/RoleRepository";
import { RoleService } from "../service/role.service";

@JsonController("/api/role")
export class RoleController {

    @Get("")
    public async getRoles() {
        let roles = await Role.find();
        console.log(roles);
        if (roles.length === 0) {
            console.log("eeee");
            roles = await this.createDefaultRoles();
        }
        return roles;
    }

    private async createDefaultRoles(): Promise<Role[]> {
        const repository = new RoleRepository();
        const admin = new Role();
        admin.isActive = true;
        admin.name = "Administrador";
        admin.description = "Administrador de sistema";
        admin.accesoVenta = true;
        admin.valorDescuento = 80;
        admin.ventAdmin = true;
        repository.createRole(admin);
        const user = new Role();
        user.isActive = true;
        user.name = "Usuario";
        user.description = "Usuario de sistema";
        user.accesoVenta = true;
        user.valorDescuento = 20;
        user.ventAdmin = true;
        repository.createRole(user);
        return await Role.find();
    }
}
