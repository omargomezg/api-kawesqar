import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {SystemUser} from "./SystemUser";

@Entity("cs_relacion_usuarioSucursal", {schema: "dbo"})
export class RelationSystemUserBranch extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idRelacion",
        type: "int",
    })
    id: number;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: false,
    })
    isActive: boolean;

    @ManyToOne(
        (type: Branch) => Branch,
        (branches: Branch) => branches.csRelacionUsuarioSucursals, {nullable: false})
    @JoinColumn({name: "idSucursal"})
    branch: Branch | null;

    @ManyToOne((type: SystemUser) => SystemUser,
        (user: SystemUser) => user.relationSystemUserBranch, {nullable: false})
    @JoinColumn({name: "rutUsuario"})
    systemUser: SystemUser | null;

}
