import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "./Invoice";
import {Product} from "./Product";

@Entity("detalleFactura", {schema: "dbo"})
export class InvoiceContent extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idDetalle",
        type: "int"
    })
    id: number;

    @Column("money", {
        name: "valUnitario",
        nullable: false
    })
    amount: number;

    @Column("int", {
        name: "cantidad",
        nullable: false
    })
    quantity: number;

    @ManyToOne(
        (type: Invoice) => Invoice,
        (invoice: Invoice) => invoice.content, {nullable: false})
    @JoinColumn({name: "idFact"})
    invoice: Invoice | null;

    @ManyToOne(
        (type: Product) => Product,
        (product: Product) => product.invoiceContents,
        {nullable: false})
    @JoinColumn({name: "id", referencedColumnName: "id"})
    product: Product | null;

}
