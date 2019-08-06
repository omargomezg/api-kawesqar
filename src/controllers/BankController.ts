import { Body, JsonController, Put } from "routing-controllers";
import { Bank } from "../entities/Bank";
import { BankRepository } from "../repository/BankRepository";

@JsonController("/api/bank")
export class BankController {
    private bankRepo = new BankRepository();

    @Put("/")
    public create(@Body() bank: Bank) {
        return this.bankRepo.createBank(bank);
    }
}
