import { Body, Get, JsonController, Put } from "routing-controllers";
import { createQueryBuilder } from "typeorm";
import { Bank } from "../entities/Bank";
import { BankRepository } from "../repository/BankRepository";

@JsonController("/bank")
export class BankController {
  private bankRepo = new BankRepository();

  @Get("/")
  public async getAll() {
    return await createQueryBuilder("Bank").getMany();
  }

  @Put("/")
  public create(@Body() bank: Bank) {
    return this.bankRepo.createBank(bank);
  }
}
