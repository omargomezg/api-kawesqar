import {Get, JsonController} from "routing-controllers";
import {createQueryBuilder} from "typeorm";
import {DocumentTypeForInput} from "../entities/DocumentTypeForInput";

@JsonController("/report")
export class ReportController {

    @Get("/invoice")
    public async getInvoices() {
        const invoiceName = "factura";
        const documentType = await DocumentTypeForInput.findOne({where: {name: invoiceName}});
        if (documentType !== undefined) {
            return await createQueryBuilder("Invoice")
                .innerJoinAndSelect("Invoice.supplier", "Supplier")
                .innerJoinAndSelect("Invoice.systemUser", "SystemUser")
                // .innerJoinAndSelect("Invoice.content", "InvoiceContent")
                .where(`Invoice.documentType.id = ${documentType.id}`)
                .getOne();
        }
    }
}
