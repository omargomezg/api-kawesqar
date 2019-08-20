import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("tipoPago", {schema: "dbo"})
export class tipoPago {

    @PrimaryGeneratedColumn({
        name: "idTipoPago",
        type: "int"
    })
    idTipoPago: number;

    @Column("nchar", {
        default: () => "N'Descripción del tipo de venta, por ejemplo cheque, contado, documento, etc...'''",
        length: 20,
        name: "descripcion",
        nullable: false
    })
    descripcion: string;

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
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.idTipoPago)
    proofOfPurchase: ProofOfPurchase[];

}
