import { Get, JsonController, Param } from "routing-controllers";
import { createQueryBuilder } from "typeorm";
import { Branch } from "../entities/Branch";
import { RelationSystemUserBranch } from "../entities/RelationSystemUserBranch";
import { CityService } from "../service/city.service";
import { RutUtils } from "../Utils/RutUtils";
import { CommonController } from "./CommonController";

@JsonController("/branch")
export class BranchController extends CommonController {

    @Get("/")
    public getAll() {
        return Branch.find();
    }

    /**
     * Get a list of branches associated with a user
     * @param rut
     */
    @Get("/:rut")
    public async getAllByUSer(@Param("rut") rut: string) {
        return await createQueryBuilder("Branch")
            .innerJoinAndSelect(RelationSystemUserBranch, "relation", "relation.branch.id = Branch.id")
            .where("relation.systemUser.rut = :userRut", { userRut: RutUtils.format(rut) })
            .andWhere("relation.isActive = :isActive", { isActive: true })
            .getMany();
    }
}
