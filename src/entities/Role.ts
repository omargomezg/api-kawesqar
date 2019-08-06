import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { cs_relacion_usuarioRol } from "./cs_relacion_usuarioRol";

@Entity("cs_rol", { schema: "dbo" })
export class role {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "idRol"
    })
    idRol: number;


    @Column("nvarchar", {
        nullable: false,
        length: 50,
        name: "titulo"
    })
    titulo: string;


    @Column("nvarchar", {
        nullable: true,
        length: 256,
        name: "descripcion"
    })
    descripcion: string | null;


    @Column("bit", {
        nullable: true,
        default: () => "(0)",
        name: "estado"
    })
    isActive: boolean | null;


    @Column("bit", {
        nullable: false,
        name: "accesoVenta"
    })
    accesoVenta: boolean;


    @Column("int", {
        nullable: false,
        name: "valorDescuento"
    })
    valorDescuento: number;


    @Column("bit", {
        nullable: false,
        default: () => "(0)",
        name: "ventAdmin"
    })
    ventAdmin: boolean;



    @OneToMany(type => cs_relacion_usuarioRol, cs_relacion_usuarioRol => cs_relacion_usuarioRol.idRol)
    csRelacionUsuarioRols: cs_relacion_usuarioRol[];

}
