import { Get, JsonController } from "routing-controllers";
import { Commune } from "../entities/Commune";

@JsonController("/city")
export class CityController {

    @Get()
    public getAll() {
        return Commune.find();
    }
}
