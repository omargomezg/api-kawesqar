import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";
import {SystemUser} from "./SystemUser";

@Entity("cs_relacion_usuarioRol", {schema: "dbo"})
export class RelacionUsuarioRol {

    @PrimaryGeneratedColumn({
        name: "idRelacion",
        type: "int"
    })
    idRelacion: number;

    @ManyToOne(type => SystemUser, cs_usuarios => cs_usuarios.RelacionUsuarioRols, {nullable: false,})
    @JoinColumn({name: "rut"})
    user: SystemUser | null;

    @ManyToOne(
        (type: Role) => Role,
        (rol: Role) => rol.csRelacionUsuarioRols, {nullable: false,})
    @JoinColumn({name: "idRol"})
    idRol: Role | null;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    estado: boolean | null;

}
