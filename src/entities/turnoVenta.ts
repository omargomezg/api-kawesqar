import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("turnoVenta", {schema: "dbo"})
export class turnoVenta {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "idTurno"
    })
    idTurno: number;

    @Column("varchar", {
        nullable: false,
        length: 12,
        name: "rutUsuario"
    })
    rutUsuario: string;

    @Column("datetime", {
        nullable: false,
        name: "inicioTurno"
    })
    inicioTurno: Date;

    @Column("datetime", {
        nullable: true,
        name: "finTurno"
    })
    finTurno: Date | null;

    @Column("char", {
        nullable: false,
        default: () => "'A'",
        name: "estado"
    })
    estado: string;

    @OneToMany(
        (type) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.idTurno)
    proofOfPurchase: ProofOfPurchase[];

}
