import { Body, Get, JsonController, Param, Put } from "routing-controllers";
import { createQueryBuilder } from "typeorm";
import { Branch } from "../entities/Branch";
import { Commune } from "../entities/Commune";
import { ISubsidiaryPostModel } from "../models/request/subsidiary.model";
import { SubsidiaryService } from "../service/subsidiary.service";

@JsonController("/subsidiary")
export class SubsidiaryController {
  public service = new SubsidiaryService();

  @Get("")
  public async getAll() {
    return await createQueryBuilder("Branch")
      .innerJoinAndSelect("Branch.commune", "Commune")
      .innerJoinAndSelect(
        "Branch.relationSystemUserBranch",
        "RelationFamilyBranch"
      )
      .getMany();
  }

  @Get("/user/:rut")
  public async getByUser(@Param("rut") rut: string) {
    return this.service.getAllByUser(rut);
  }

  @Get("/:id")
  public async getById(@Param("id") id: number) {
    // return Branch.findByIds([id]);
    return await createQueryBuilder("Branch")
      .innerJoinAndSelect("Branch.commune", "Commune")
      .where(`Branch.id = ${id}`)
      .getOne();
  }

  @Put("/:id")
  public update(@Param("id") id: number, @Body() branch: Branch) {
    console.log("Branch =>" + JSON.stringify(branch));
    if (id === branch.id) {
      return Branch.save(branch);
    }
    return new ErrorEvent("Branch not exists");
  }
}
