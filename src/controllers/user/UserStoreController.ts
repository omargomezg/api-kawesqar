import { Body, JsonController, OnUndefined, Post } from "routing-controllers";
import { Store } from "../../entities/Store";
import { CommonController } from "../CommonController";

@JsonController("/api/user")
export class UserStoreController extends CommonController {

    @Post("/store")
    @OnUndefined(404)
    public async addStore(@Body() data: any) {
        const store = await Store.findOne(data.storeId);
        if (store) {
            return store;
        }
        return null;
        /*const branch = await Branch.find();
        return store;*/
    }
}
