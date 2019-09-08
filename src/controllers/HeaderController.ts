import { Get, JsonController, Param } from "routing-controllers";
import { SystemUser } from "../entities/SystemUser";
import { HeaderService } from "../service/header.service";
import { RutUtils } from "../Utils/RutUtils";

@JsonController("/api")
export class HeaderController {

    @Get("/header/:rut")
    public getByRut(@Param("rut") rut: string) {
        // const header = new HeaderService();
        // return header.getByRut(rut);
        return SystemUser.findOne({
            relations: ["branch"],
            where: {
                rut: RutUtils.format(rut)
            }
        });
    }
}
