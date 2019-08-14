import {Get, JsonController, Param} from "routing-controllers";
import {Branch} from "../entities/Branch";
import {CityService} from "../service/city.service";
import {CommonController} from "./CommonController";

@JsonController("/api/branch")
export class BranchController extends CommonController {

    @Get("/")
    public getAll() {
        const city = new CityService();
        return city.getAll();
    }

    @Get("/:rut")
    public getAllByUSer(@Param("rut") rut: string) {
        return Branch.find({
            where: {csRelacionUsuarioSucursals}
        });
    }
}
