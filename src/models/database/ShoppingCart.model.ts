import {SubsidiaryModel} from "./Subsidiary.model";
import {UserModel} from "./User.model";

export class ShoppingCartModel {
    public id: number | undefined;
    public user: UserModel | undefined;
    public subsidiary: SubsidiaryModel | undefined;
    public created: string | undefined;
    public updated: string | undefined;
}
