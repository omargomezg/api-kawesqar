import {Get, JsonController} from "routing-controllers";
import {CommonController} from "../CommonController";

@JsonController("/api/user-store")
export class UserStoreController extends CommonController {

    @Get("/")
    public async getAllStores() {
        return "-o-";
    }
}
