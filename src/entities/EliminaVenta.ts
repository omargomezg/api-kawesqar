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

    /**
     * The date when is deleted
     */
    @Column("datetime", {
        name: "fecha",
        nullable: false
    })
    date: Date;

    /**
     * Reason why sell is deleted
     */
    @Column("varchar", {
        length: 500,
        name: "motivo",
        nullable: false
    })
    description: string;

    @ManyToOne(
        (type) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.eliminaVentass,
        {nullable: false})
    @JoinColumn({name: "idFolio", referencedColumnName: "id"})
    proofOfPurchase: ProofOfPurchase | null;

    @ManyToOne(
        (type) => SystemUser,
        (systemUser: SystemUser) => systemUser.eliminaVentas,
        {nullable: false})
    @JoinColumn({name: "rutUsuario"})
    systemUser: SystemUser | null;

}
