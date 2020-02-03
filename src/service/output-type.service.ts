import { RelationSystemUserOutputType } from "../entities/RelationSystemUserOutputType";
import { SaleTypeEnum } from "../models/enum/type-sale.enum";

export class OutputTypeService {
  public adapterCode(
    relationSystemUserOutputType: RelationSystemUserOutputType[]
  ): RelationSystemUserOutputType[] {
    relationSystemUserOutputType.forEach(item => {
      if (item.outputType != null) {
        item.outputType.code = this.getCode(
          item.outputType.code,
          item.outputType.name
        );
      }
    });
    return relationSystemUserOutputType;
  }

  private getCode(code: string, name: string): string {
    let result = "";
    switch (code.trim()) {
      case "B":
        result = SaleTypeEnum.CASH_SALE;
        break;
      case "BC":
        result = SaleTypeEnum.CREDIT_CARD;
    }
    if ("" === result) {
      switch (name.trim()) {
        case "Trasferencia":
          result = SaleTypeEnum.BRANCH_TRANSFER;
          break;
        case "Entrega Insumos":
          result = SaleTypeEnum.DELIVERY_SUPPLIES;
      }
    }
    return result;
  }
}
