import { Get, JsonController } from "routing-controllers";
import { MeasureService } from "../service/measure.service";
import {Measure} from "../entities/Measure";
import {createQueryBuilder} from "typeorm";
import {RelationSystemUserBranch} from "../entities/RelationSystemUserBranch";
import {RutUtils} from "../Utils/RutUtils";

@JsonController()
export class MeasureController {

    @Get("/measure")
    public getAll() {
        const measure = new MeasureService();
        return measure.getAll();
    }

    @Get("/v1/measure")
    public async getAll1() {
        return await createQueryBuilder("Measure")
            .getMany();
    }
}
