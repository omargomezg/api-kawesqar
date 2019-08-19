import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {Family} from "./Family";

@Entity("sucursalAsociada", {schema: "dbo"})
export class RelationFamilyBranch {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    id: number;

    @Column("bit", {
        default: () => "(0)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

    @ManyToOne(
        (type: Branch) => Branch,
        (branch: Branch) => branch.branches, {})
    @JoinColumn({name: "idSucursal"})
    branch: Branch | null;

    @ManyToOne(
        (type: Family) => Family,
        (family: Family) => family.branches, {})
    @JoinColumn({name: "idFamilia"})
    family: Family | null;

}
