import { Get, JsonController } from "routing-controllers";
import { MeasureService } from "../service/measure.service";

@JsonController("/api")
export class MeasureController {

    @Get("/measure")
    public getAll() {
        const measure = new MeasureService();
        return measure.getAll();
    }
}