import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("tipoPago", {schema: "dbo",})
export class TipoPago {

    @PrimaryGeneratedColumn({
        name: "idTipoPago",
        type: "int"
    })
    id: number;

    @Column("nchar", {
        default: () => "N'Descripción del tipo de venta, por ejemplo cheque, contado, documento, etc...'''",
        length: 20,
        name: "descripcion",
        nullable: false
    })
    name: string;

    @Column("bit", {
        default: () => "(0)",
        name: "usoBoleta",
        nullable: false
    })
    usoBoleta: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "usoFactura",
        nullable: false
    })
    usoFactura: boolean;

    @OneToMany(
        (type: ProofOfPurchase) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.tipoPago)
    proofOfPurchase: ProofOfPurchase[];

}
