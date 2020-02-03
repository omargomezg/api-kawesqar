import { Get, JsonController, OnUndefined, Param } from "routing-controllers";
import { createQueryBuilder } from "typeorm";
import { RelationSystemUserOutputType } from "../entities/RelationSystemUserOutputType";
import { UndefinedArrayError } from "../models/error/UndefinedArrayError";
import { OutputTypeService } from "../service/output-type.service";
import { RutUtils } from "../Utils/RutUtils";

@JsonController("/user-output-type")
export class RelationSystemUserOutputTypeController {
  @Get("/:rut")
  @OnUndefined(UndefinedArrayError)
  public async getRelations(@Param("rut") rut: string) {
    const outputTypeService = new OutputTypeService();
    let result = await createQueryBuilder("RelationSystemUserOutputType")
      .innerJoinAndSelect(
        "RelationSystemUserOutputType.outputType",
        "OutputType"
      )
      .where("RelationSystemUserOutputType.systemUser = :systemUser", {
        systemUser: RutUtils.format(rut)
      })
      .getMany();
    if (result instanceof Array) {
      return (result = outputTypeService.adapterCode(result));
    }
    return result;
  }
}
