import {Delete, Get, HeaderParam, JsonController, Param} from "routing-controllers";
import {createQueryBuilder} from "typeorm";
import {ProofOfPurchase} from "../entities/ProofOfPurchase";
import {ProofOfPurchaseDetail} from "../entities/ProofOfPurchaseDetail";
import {ProofOfPurchaseService} from "../service/proof-of-purchase.service";
import {CommonController} from "./CommonController";
import {Client} from "../entities/Client";

@JsonController("/proof-of-purchase")
export class HeaderController extends CommonController {
    @Get("/:id")
    public async getById(
        @Param("id") id: number,
        @HeaderParam("UsrKey") usrKey: string
    ) {
        const user = await this.getUser(usrKey);
        let result: ProofOfPurchase = new ProofOfPurchase();
        if (id === -1) {
            result = new ProofOfPurchase();
            result.systemUser = user;
            result.purchaseDetails = [];
            result.client = new Client();
        } else {
            const resultQuery = await createQueryBuilder("ProofOfPurchase")
                .innerJoinAndSelect("ProofOfPurchase.client", "Client")
                .innerJoinAndSelect(
                    "ProofOfPurchase.purchaseDetails",
                    "ProofOfPurchaseDetail"
                )
                .innerJoinAndSelect("ProofOfPurchaseDetail.product", "Product")
                .where(`ProofOfPurchase.id = ${id}`)
                .getOne();
            if (resultQuery instanceof ProofOfPurchase) {
                result = resultQuery;
            }
        }
        return result;
    }

    @Delete("/:id")
    public async deleteById(@Param("id") id: number) {
        const service = new ProofOfPurchaseService();
        return service.deleteById(id);
    }
}
