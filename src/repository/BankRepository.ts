import {getManager} from "typeorm";
import {Bank} from "../entity/Bank";

export class BankRepository {
    public createBank(bank: Bank): Promise<Bank> {
        return getManager().getRepository(Bank).save(bank);
    }
}
