import { Get, JsonController, Param } from "routing-controllers";
import { RoleService } from "../service/role.service";

@JsonController("/api/role")
export class RoleController {

    @Get("")
    public getRoles() {
        const role = new RoleService();
        return role.getList();
    }
}
