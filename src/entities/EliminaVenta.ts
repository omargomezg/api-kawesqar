import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProofOfPurchase} from "./ProofOfPurchase";
import {SystemUser} from "./SystemUser";

@Entity("eliminaVenta", {schema: "dbo"})
export class EliminaVenta extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    id: number;

    @Column("datetime", {
        name: "fecha",
        nullable: false
    })
    date: Date;

    @Column("varchar", {
        length: 500,
        name: "motivo",
        nullable: false
    })
    motivo: string;

    @ManyToOne(
        (type) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.eliminaVentass,
        {nullable: false})
    @JoinColumn({name: "idFolio"})
    proofOfPurchase: ProofOfPurchase | null;

    @ManyToOne(
        (type: SystemUser) => SystemUser,
        (systemUser: SystemUser) => systemUser.eliminaVentas,
        {nullable: false})
    @JoinColumn({name: "rutUsuario"})
    systemUser: SystemUser | null;

}
