import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("detalleVenta", {schema: "dbo"})
export class ProofOfPurchaseDetail {

    @PrimaryGeneratedColumn({
        name: "idDetalleVenta",
        type: "int"
    })
    id: number;

    @Column("int", {
        name: "cantidad",
        nullable: false
    })
    quantity: number;

    @Column("money", {
        name: "valorTotal",
        nullable: false
    })
    valorTotal: number;

    @Column("bit", {
        name: "vGranel",
        nullable: false
    })
    vGranel: boolean;

    @Column("int", {
        name: "idArticuloID",
        nullable: true
    })
    idArticuloID: number | null;

    @Column("money", {
        name: "vCosto",
        nullable: true
    })
    vCosto: number | null;

    @Column("bit", {
        name: "f",
        nullable: true
    })
    f: boolean | null;

    @ManyToOne(
        (type: ProofOfPurchase) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.purchaseDetails,
        {nullable: false})
    @JoinColumn({name: "idFolio"})
    proofOfPurchase: ProofOfPurchase | null;

    @ManyToOne(
        (type: Product) => Product,
        (product: Product) => product.proofOfPurchaseDetail,
        {nullable: false})
    @JoinColumn({name: "article_id", referencedColumnName: "id"})
    product: Product | null;

}
