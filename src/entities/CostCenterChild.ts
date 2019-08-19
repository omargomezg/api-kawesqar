import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {comprobanteEgreso} from "./comprobanteEgreso";
import {CostCenter} from "./CostCenter";

@Entity("subGrupo", {schema: "dbo"})
export class CostCenterChild {

    @PrimaryGeneratedColumn({
        name: "idSubGrupo",
        type: "int"
    })
    id: number;

    @ManyToOne(
        (type: CostCenter) => CostCenter,
        (costCenter: CostCenter) => costCenter.child, {nullable: false})
    @JoinColumn({name: "padre"})
    costCenter: CostCenter | null;

    @Column("nvarchar", {
        name: "descripcion",
        nullable: false,
    })
    name: string;

    @Column("bit", {
        default: () => "(0)",
        name: "estado",
        nullable: false,
    })
    isActive: boolean;

    @OneToMany(type => comprobanteEgreso, comprobanteEgreso => comprobanteEgreso.idSubGrupo)
    comprobanteEgresos: comprobanteEgreso[];

}
