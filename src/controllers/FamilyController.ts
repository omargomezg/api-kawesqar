import { Get, JsonController, Param } from "routing-controllers";
import { FamilyService } from "../service/family.service";

@JsonController("/api")
export class FamilyController {

    @Get("/family/:rut")
    public getByRut(@Param("rut") rut: string) {
        const family = new FamilyService();
        return family.getByRut(rut);
    }
}
