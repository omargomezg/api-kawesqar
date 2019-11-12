import {Get, JsonController, OnUndefined, Param} from "routing-controllers";
import {createQueryBuilder} from "typeorm";
import {ProofOfPurchase} from "../entities/ProofOfPurchase";
import {ProofOfPurchaseDetail} from "../entities/ProofOfPurchaseDetail";
import {UndefinedArrayError} from "../models/error/UndefinedArrayError";

@JsonController("/proof-of-purchase")
export class HeaderController {

    @Get("/:id")
    @OnUndefined(UndefinedArrayError)
    public async getByRut(@Param("id") id: number) {
        return await createQueryBuilder("ProofOfPurchase")
            .innerJoinAndSelect("ProofOfPurchase.purchaseDetails", "ProofOfPurchaseDetail")
            .where(`ProofOfPurchase.id = ${id}`)
            .getOne();
    }
}
