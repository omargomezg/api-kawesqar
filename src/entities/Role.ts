import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RelationSystemUserRole} from "./RelationSystemUserRole";

@Entity("cs_rol", {schema: "dbo"})
export class Role {

    @PrimaryGeneratedColumn({
        name: "idRol",
        type: "int",
    })
    id: number;

    @Column("nvarchar", {
        length: 50,
        name: "titulo",
        nullable: false,
    })
    name: string;

    @Column("nvarchar", {
        length: 256,
        name: "descripcion",
        nullable: true,
    })
    description: string | null;

    @Column("bit", {
        default: () => "(0)",
        name: "estado",
        nullable: true,
    })
    isActive: boolean | null;

    @Column("bit", {
        name: "accesoVenta",
        nullable: false,
    })
    accesoVenta: boolean;

    @Column("int", {
        name: "valorDescuento",
        nullable: false,
    })
    valorDescuento: number;

    @Column("bit", {
        default: () => "(0)",
        name: "ventAdmin",
        nullable: false,
    })
    ventAdmin: boolean;

    @OneToMany(
        (type: RelationSystemUserRole) => RelationSystemUserRole,
        (relationSystemUserRole: RelationSystemUserRole) => relationSystemUserRole.idRol)
    relationSystemUserRoles: RelationSystemUserRole[];

}
