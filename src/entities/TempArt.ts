import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {Invoice} from "./Invoice";
import {Product} from "./Product";
import {Store} from "./Store";

@Entity("TempArt", {schema: "dbo"})
export class TempArt extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "ID",
        type: "int"
    })
    id: number;

    @Column("datetime", {
        name: "FechaIng",
        nullable: false
    })
    created: Date;

    @Column("money", {
        name: "artValor",
        nullable: false
    })
    amount: number;

    @Column("int", {
        name: "ArtCantidad",
        nullable: false
    })
    ArtCantidad: number;

    @Column("datetime", {
        name: "Vencimiento",
        nullable: true
    })
    expirationDate: Date | null;

    @ManyToOne(
        (type: Product) => Product,
        (product: Product) => product.tempArts,
        {nullable: false})
    @JoinColumn({name: "article_id", referencedColumnName: "id"})
    product: Product | null;

    @ManyToOne(
        (type: Invoice) => Invoice,
        (invoice: Invoice) => invoice.tempArts,
        {nullable: false})
    @JoinColumn({name: "IdFact"})
    invoice: Invoice | null;

    @ManyToOne((type) => Branch,
        (branch: Branch) => branch.tempArts, {nullable: false})
    @JoinColumn({name: "idSucursal"})
    branch: Branch | null;

    @ManyToOne((type: Store) => Store,
        (store: Store) => store.tempArts, {nullable: false})
    @JoinColumn({name: "idBodega"})
    store: Store | null;

}
