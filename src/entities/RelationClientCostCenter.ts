import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CostCenter} from "./CostCenter";

@Entity("Tab_CliUnionGrupo", {schema: "dbo"})
export class RelationClientCostCenter {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "numeric",
    })
    id: number;

    @Column("nvarchar", {
        length: 13,
        name: "Rut_cli",
        nullable: false,
    })
    rut: string;

    @ManyToOne(
        (type: CostCenter) => CostCenter,
        (costCenter: CostCenter) => costCenter.relationClientCostCenter, {nullable: false})
    @JoinColumn({name: "IdGrupo"})
    costCenter: CostCenter | null;

}
