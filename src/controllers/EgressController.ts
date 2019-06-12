import { Get, JsonController } from "routing-controllers";
import { EgressService } from "../service/egress.service";

@JsonController("/api")
export class EgressController {

    @Get("/egress")
    public getAll() {
        const egress = new EgressService();
        return egress.getAll();
    }
}
