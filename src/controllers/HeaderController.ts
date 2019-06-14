import { Get, JsonController, Param } from "routing-controllers";
import { HeaderService } from "../service/header.service";

@JsonController("/api")
export class HeaderController {

    @Get("/header/:rut")
    public getByRut(@Param("rut") rut: string) {
        const header = new HeaderService();
        return header.getByRut(rut);
    }
}
