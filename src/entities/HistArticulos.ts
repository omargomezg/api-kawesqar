import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "./Invoice";
import {Product} from "./Product";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("histArticulos", {schema: "dbo"})
export class HistArticulos extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idtable",
        type: "numeric"
    })
    idtable: number;

    @Column("int", {
        name: "ID",
        nullable: false
    })
    id: number;

    @Column("datetime", {
        name: "FechaIng",
        nullable: false
    })
    create: Date;

    @Column("money", {
        name: "ArtValor",
        nullable: false
    })
    ArtValor: number;

    @Column("datetime", {
        default: () => "'01/01/1900 0:00:00'",
        name: "Vencimiento",
        nullable: false
    })
    Vencimiento: Date;

    @Column("int", {
        name: "idSucursal",
        nullable: true
    })
    idSucursal: number | null;

    @Column("bit", {
        name: "estado",
        nullable: true
    })
    estado: boolean | null;

    @Column("bit", {
        name: "estadoUso",
        nullable: true
    })
    estadoUso: boolean | null;

    @Column("varchar", {
        length: 12,
        name: "rutusuario",
        nullable: true
    })
    rutusuario: string | null;

    @Column("int", {
        name: "granelOriginal",
        nullable: true
    })
    granelOriginal: number | null;

    @Column("int", {
        name: "idBodega",
        nullable: true
    })
    idBodega: number | null;

    @ManyToOne(
        (type: Invoice) => Invoice,
        (facturas: Invoice) => facturas.histArticuloss)
    @JoinColumn({name: "IdFact"})
    invoice: Invoice | null;

    @ManyToOne(
        (type: ProofOfPurchase) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.histArticuloss,
        {nullable: false})
    @JoinColumn({name: "IdFolio"})
    proofOfPurchase: ProofOfPurchase | null;

    @ManyToOne(
        (type: Product) => Product,
            (product: Product) => product.histArticuloss,
        {nullable: false})
    @JoinColumn({name: "article_id", referencedColumnName: "id"})
    product: Product | null;

}
