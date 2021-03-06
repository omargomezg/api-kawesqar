import { Body, JsonController, Post } from "routing-controllers";
import { IExistenceModel } from "../models/request/existence.model";
import { ExistenceService } from "../service/existence.service";

@JsonController()
export class ExistenceController {

    @Post("/existence")
    public getExitence(@Body() data: IExistenceModel) {
        const existence = new ExistenceService();
        return existence.getData(data);
    }
}
