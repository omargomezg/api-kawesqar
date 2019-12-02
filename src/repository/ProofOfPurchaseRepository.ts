import {EntityRepository, Repository} from "typeorm";
import {ProofOfPurchase} from "../entities/ProofOfPurchase";

@EntityRepository()
export class ProofOfPurchaseRepository extends Repository<ProofOfPurchase> {

    getById() {
        return undefined;
    }
}
