import {Length} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("turnoVenta", {schema: "dbo"})
export class TurnoVenta {

    @PrimaryGeneratedColumn({
        name: "idTurno",
        type: "int"
    })
    id: number;

    @Column("varchar", {
        length: 12,
        name: "rutUsuario",
        nullable: false
    })
    @Length(0, 12)
    userRut: string;

    @Column("datetime", {
        name: "inicioTurno",
        nullable: false
    })
    inicioTurno: Date;

    @Column("datetime", {
        name: "finTurno",
        nullable: true
    })
    finTurno: Date | null;

    @Column("char", {
        default: () => "'A'",
        name: "estado",
        nullable: false
    })
    isActive: string;

    @OneToMany(
        (type) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.turnoVenta)
    proofOfPurchase: ProofOfPurchase[];

}
