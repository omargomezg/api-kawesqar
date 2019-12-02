import { Get, JsonController, Param } from "routing-controllers";
import { OutputType } from "../entities/OutputType";
import { EgressService } from "../service/egress.service";

/**
 * A controller for egress
 */
@JsonController("/egress")
export class EgressController {

    @Get("/")
    public getAll() {
        return OutputType.find();
        /* const egress = new EgressService();
        return egress.getAll(); */
    }

    @Get("/:rut")
    public getAllByRut(@Param("rut") rut: string) {
        const egress = new EgressService();
        return egress.getAllByRut(rut);
    }
}
