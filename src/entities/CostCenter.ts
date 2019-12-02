import {Length} from "class-validator";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CostCenterChild} from "./CostCenterChild";
import {RelationClientCostCenter} from "./RelationClientCostCenter";

@Entity("Grupo", {schema: "dbo"})
export class CostCenter extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idGrupo",
        type: "int"
    })
    id: number;

    @Column("nvarchar", {
        length: 50,
        name: "nomGrupo",
        nullable: false
    })
    @Length(0, 50)
    name: string;

    @Column("bit", {
        default: () => "(0)",
        name: "estado",
        nullable: false,
    })
    isActive: boolean;

    @OneToMany(
        (type: CostCenterChild) => CostCenterChild,
            (child: CostCenterChild) => child.costCenter)
    child: CostCenterChild[];

    @OneToMany(
        (type: RelationClientCostCenter) => RelationClientCostCenter,
        (relationClientCostCenter: RelationClientCostCenter) => relationClientCostCenter.costCenter)
    relationClientCostCenter: RelationClientCostCenter[];

}
