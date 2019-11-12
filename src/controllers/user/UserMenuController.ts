import {Get, JsonController, Param} from "routing-controllers";
import { Store } from "../../entities/Store";
import { CommonController } from "../CommonController";

@JsonController("/user-menu/")
export class UserMenuController extends CommonController {

    @Get("/:rut")
    public getMenu(@Param("rut") rut: string) {
        return Store.find();
    }
}
