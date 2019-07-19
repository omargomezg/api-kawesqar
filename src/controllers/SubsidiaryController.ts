import { Body, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { ISubsidiaryPostModel } from "../models/request/subsidiary.model";
import { SubsidiaryService } from "../service/subsidiary.service";

@JsonController("/api/subsidiary")
export class SubsidiaryController {
    public service = new SubsidiaryService();

    @Get("")
    public getAll() {
        return this.service.getList();
    }

    @Get("/:id")
    public getById(@Param("id") id: number) {
        return this.service.getById(id);
    }

    @Get("/user/:rut")
    public getByUser(@Param("rut") rut: string) {
        return this.service.getAllByUser(rut);
    }

    @Put("/:id")
    public update(@Param("id") id: number, @Body() data: ISubsidiaryPostModel) {
        return this.service.update(id, data);
    }
}
