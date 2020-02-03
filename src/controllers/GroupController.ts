import { Get, JsonController, Param } from "routing-controllers";
import { createQueryBuilder } from "typeorm";
import { CostCenterChild } from "../entities/CostCenterChild";

@JsonController("/cost-center")
export class FamilyController {
  @Get("/child/:rut")
  public async getByRut(@Param("rut") rut: string) {
    return await createQueryBuilder("CostCenterChild")
      .where(`CostCenterChild.isActive = 1`)
      .getMany();
  }
}
