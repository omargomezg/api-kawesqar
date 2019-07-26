import {ShoppingCartDetailModel} from "./ShoppingCartDetail.model";
import {SubsidiaryModel} from "./Subsidiary.model";
import {UserModel} from "./User.model";

export class ShoppingCartModel {
    public id: number | undefined;
    public user: UserModel | undefined;
    public subsidiaryFrom: SubsidiaryModel = new SubsidiaryModel();
    public subsidiaryTo: SubsidiaryModel = new SubsidiaryModel();
    public created: string | undefined;
    public updated: string | undefined;
    public detail: ShoppingCartDetailModel[] = [];
}
