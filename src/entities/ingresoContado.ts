import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("ingresoContado", {schema: "dbo"})
export class ingresoContado {

    @PrimaryGeneratedColumn({
        name: "idIngresoContado",
        type: "int"
    })
    idIngresoContado: number;

    @ManyToOne(
        (type: ProofOfPurchase) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.ingresoContados,
        {nullable: false})
    @JoinColumn({name: "idFolio"})
    proofOfPurchase: ProofOfPurchase | null;

    @Column("nvarchar", {
        length: 50,
        name: "nombreComprador",
        nullable: false
    })
    nombreComprador: string;

    @Column("numeric", {
        name: "numCorrelativo",
        nullable: false,
        scale: 0
    })
    numCorrelativo: number;

    @Column("int", {
        name: "idSucursal",
        nullable: false
    })
    idSucursal: number;

}
