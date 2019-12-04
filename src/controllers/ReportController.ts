import {Get, JsonController, Param} from "routing-controllers";
import {createQueryBuilder} from "typeorm";
import {DocumentTypeForInput} from "../entities/DocumentTypeForInput";
import {RutUtils} from "../Utils/RutUtils";

@JsonController("/report")
export class ReportController {

    @Get("/invoice/:from/:to/:userRut")
    public async getInvoices(@Param("from") from: Date, @Param("to") to: Date, @Param("userRut") userRut: string) {
        const invoiceName = "factura";
        const documentType = await DocumentTypeForInput.findOne({where: {name: invoiceName}});
        if (documentType !== undefined) {
            return await createQueryBuilder("Invoice")
                .innerJoinAndSelect("Invoice.supplier", "Supplier")
                .innerJoinAndSelect("Invoice.systemUser", "SystemUser")
                .innerJoinAndSelect("Invoice.content", "InvoiceContent")
                .innerJoin("InvoiceContent.product", "Product")
                .select(["Invoice", "Supplier.rut", "Supplier.name", "InvoiceContent.amount",
                    "InvoiceContent.quantity", "Product.name"])
                .where(`Invoice.documentType.id = ${documentType.id}`)
                .andWhere(`Invoice.date >= '${from.toISOString()}'`)
                .andWhere(`Invoice.date <= '${to.toISOString()}'`)
                .andWhere(`SystemUser.rut = '${RutUtils.format(userRut)}'`)
                .getMany();
        }
    }
}
