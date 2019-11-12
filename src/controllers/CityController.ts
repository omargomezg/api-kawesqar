import {Get, JsonController} from "routing-controllers";
import {CityService} from "../service/city.service";

@JsonController()
export class CityController {

    @Get("/city")
    public getAll() {
        const city = new CityService();
        return city.getAll();
    }
}
