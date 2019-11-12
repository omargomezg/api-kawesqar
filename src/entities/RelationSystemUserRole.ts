import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Role } from "./Role";
import { SystemUser } from "./SystemUser";

@Entity("cs_relacion_usuarioRol", { schema: "dbo" })
export class RelationSystemUserRole extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idRelacion",
        type: "int"
    })
    id: number;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

    @ManyToOne(
        (type) => SystemUser,
        (systemUser: SystemUser) => systemUser.relationSystemUserRoles,
        { nullable: false })
    @JoinColumn({ name: "rut" })
    user: SystemUser | null;

    @ManyToOne(
        (type: Role) => Role,
        (rol: Role) => rol.relationSystemUserRoles,
        { nullable: false })
    @JoinColumn({ name: "idRol" })
    role: Role | null;

}
