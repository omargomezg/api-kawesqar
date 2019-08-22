import {Get, JsonController} from "routing-controllers";
import {Store} from "../entities/Store";
import {CommonController} from "./CommonController";

@JsonController("/api/store")
export class StoreController extends CommonController {

    @Get("/")
    public getAll() {
        return Store.find();
    }
}
