import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bank} from "./Bank";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("chequePago", {schema: "dbo"})
export class chequePago {

    @PrimaryGeneratedColumn({
        name: "idChequePago",
        type: "int"
    })
    idChequePago: number;

    @Column("numeric", {
        name: "numero",
        nullable: false,
        scale: 0,
    })
    numero: number;

    @ManyToOne((type: Bank) => Bank, (bancos: Bank) => bancos.cheques, {nullable: false,})
    @JoinColumn({name: "idBanco"})
    idBanco: Bank | null;

    @Column("numeric", {
        name: "monto",
        nullable: false,
        scale: 0
    })
    monto: number;

    @Column("nchar", {
        length: 10,
        name: "telefono",
        nullable: true
    })
    telefono: string | null;

    @Column("nvarchar", {
        length: 50,
        name: "nombrePersona",
        nullable: true
    })
    nombrePersona: string | null;

    @ManyToOne(
        (type: ProofOfPurchase) => ProofOfPurchase,
        (comprobanteEgreso: ProofOfPurchase) => comprobanteEgreso.chequePagos,
        {nullable: false})
    @JoinColumn({name: "IdFolio"})
    idFolio: ProofOfPurchase | null;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

}
