import {
    BaseEntity, Column, Entity, Index, JoinColumn,
    JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne,
    PrimaryColumn, PrimaryGeneratedColumn, RelationId
} from "typeorm";
import { role } from "./Role";
import { SystemUser } from "./SystemUser";


@Entity("cs_relacion_usuarioRol", { schema: "dbo" })
export class cs_relacion_usuarioRol {

    @PrimaryGeneratedColumn({
        name: "idRelacion",
        type: "int"
    })
    idRelacion: number;

    @ManyToOne(type => SystemUser, cs_usuarios => cs_usuarios.csRelacionUsuarioRols, { nullable: false, })
    @JoinColumn({ name: "rut" })
    user: SystemUser | null;

    @ManyToOne(type => role, cs_rol => cs_rol.csRelacionUsuarioRols, { nullable: false, })
    @JoinColumn({ name: "idRol" })
    idRol: role | null;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    estado: boolean | null;

}
