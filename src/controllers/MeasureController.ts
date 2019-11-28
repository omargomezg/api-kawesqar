import { Body, Get, JsonController, Param, Put } from "routing-controllers";
import { createQueryBuilder } from "typeorm";
import { Measure } from "../entities/Measure";
import { RelationSystemUserBranch } from "../entities/RelationSystemUserBranch";
import { MeasureService } from "../service/measure.service";
import { RutUtils } from "../Utils/RutUtils";

@JsonController("/measure")
export class MeasureController {

    @Get("/")
    public getAll() {
        const measure = new MeasureService();
        return measure.getAll();
    }

    @Get("/v1/")
    public async getAll1() {
        return await createQueryBuilder("Measure")
            .getMany();
    }

    @Put("/:id")
    public async putMeasure(@Param("id") key: number, @Body() measure: Measure) {
        // code here!

        if (Measure.findOne({ id: measure.id })) {
            return Measure.update({ id: measure.id }, measure);
        }
        return new ErrorEvent("id not exists");
    }
}
