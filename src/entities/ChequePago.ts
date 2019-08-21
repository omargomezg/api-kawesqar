import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bank} from "./Bank";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("chequePago", {schema: "dbo"})
export class ChequePago {

    @PrimaryGeneratedColumn({
        name: "idChequePago",
        type: "int"
    })
    id: number;

    @Column("numeric", {
        name: "numero",
        nullable: false,
        scale: 0,
    })
    number: number;

    @Column("numeric", {
        name: "monto",
        nullable: false,
        scale: 0
    })
    amount: number;

    @ManyToOne(
        (type: Bank) => Bank,
        (bank: Bank) => bank.cheques,
        {nullable: false})
    @JoinColumn({name: "idBanco"})
    bank: Bank | null;

    @Column("nchar", {
        length: 10,
        name: "telefono",
        nullable: true
    })
    telephone: string | null;

    @Column("nvarchar", {
        length: 50,
        name: "nombrePersona",
        nullable: true
    })
    nombrePersona: string | null;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

    @ManyToOne(
        (type: ProofOfPurchase) => ProofOfPurchase,
        (comprobanteEgreso: ProofOfPurchase) => comprobanteEgreso.cheques,
        {nullable: false})
    @JoinColumn({name: "IdFolio"})
    proofOfPurchase: ProofOfPurchase | null;

}
