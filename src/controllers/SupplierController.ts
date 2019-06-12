import { Get, JsonController, Param } from "routing-controllers";
import { SupplierService } from "../service/supplier.service";

@JsonController("/api")
export class SupplierController {

    @Get("/supplier/:rut")
    public getByRut(@Param("rut") rut: string) {
        const supplier = new SupplierService();
        return supplier.getByRut(rut);
    }
}
