import {Get, JsonController, Param} from "routing-controllers";
import {EgressService} from "../service/egress.service";

@JsonController("/api/egress")
export class EgressController {

    @Get("/")
    public getAll() {
        const egress = new EgressService();
        return egress.getAll();
    }

    @Get("/:rut")
    public getAllByRut(@Param("rut") rut: string) {
        const egress = new EgressService();
        return egress.getAllByRut(rut);
    }
}
