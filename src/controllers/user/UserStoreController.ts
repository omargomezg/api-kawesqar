import {Get, JsonController} from "routing-controllers";
import {Store} from "../../entities/Store";
import {CommonController} from "../CommonController";

@JsonController("/api/user-store")
export class UserStoreController extends CommonController {

    @Get("/")
    public getAllStores() {
        return Store.find();
    }
}
