import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {SystemUser} from "./SystemUser";

@Entity("cs_relacion_usuarioSucursal", {schema: "dbo"})
export class RelationSystemUserBranch {

    @PrimaryGeneratedColumn({
        name: "idRelacion",
        type: "int",
    })
    id: number;

    @ManyToOne(
        (type: Branch) => Branch,
        (branchs: Branch) => branchs.csRelacionUsuarioSucursals, {nullable: false})
    @JoinColumn({name: "idSucursal"})
    branch: Branch | null;

    @ManyToOne((type: SystemUser) => SystemUser,
        (user: SystemUser) => user.csRelacionUsuarioSucursals, {nullable: false})
    @JoinColumn({name: "rutUsuario"})
    systemUser: SystemUser | null;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: false,
    })
    isActive: boolean;

}
