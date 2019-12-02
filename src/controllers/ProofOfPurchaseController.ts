import {Delete, Get, JsonController, Param} from "routing-controllers";
import {createQueryBuilder} from "typeorm";
import {ProofOfPurchase} from "../entities/ProofOfPurchase";
import {ProofOfPurchaseDetail} from "../entities/ProofOfPurchaseDetail";
import {ProofOfPurchaseService} from "../service/proof-of-purchase.service";

@JsonController("/proof-of-purchase")
export class HeaderController {

    @Get("/:id")
    public async getById(@Param("id") id: number) {
        const result = await createQueryBuilder("ProofOfPurchase")
            .innerJoinAndSelect("ProofOfPurchase.client", "Client")
            .innerJoinAndSelect("ProofOfPurchase.purchaseDetails", "ProofOfPurchaseDetail")
            .innerJoinAndSelect("ProofOfPurchaseDetail.product", "Product")
            .where(`ProofOfPurchase.id = ${id}`)
            .getOne();
        if (result === undefined) {
            return {};
        }
        return result;
    }

    @Delete("/:id")
    public async deleteById(@Param("id") id: number) {
        const service = new ProofOfPurchaseService();
        return service.deleteById(id);
    }
}
