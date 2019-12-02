import { Length } from "class-validator";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProofOfPurchase } from "./ProofOfPurchase";
import { SystemUser } from "./SystemUser";

@Entity("turnoVenta", { schema: "dbo" })
export class TurnoVenta extends BaseEntity {

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

    @ManyToOne(
        (type: SystemUser) => SystemUser,
        (systemUser: SystemUser) => systemUser.turnoVenta,
        { nullable: false })
    @JoinColumn({ name: "rutUsuario" })
    systemUser: SystemUser | null;

}
