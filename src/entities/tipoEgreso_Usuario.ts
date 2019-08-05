import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId
} from "typeorm";
import {SystemUser} from "./SystemUser";
import {tipoEgreso} from "./tipoEgreso";

@Entity("tipoEgreso_Usuario", {schema: "dbo"})
export class tipoEgreso_Usuario {

    @ManyToOne(type => tipoEgreso, tipoEgreso => tipoEgreso.tipoEgresoUsuarios, {nullable: false,})
    @JoinColumn({name: 'idtVenta'})
    idtVenta: tipoEgreso | null;

    @ManyToOne(type => SystemUser, cs_usuarios => cs_usuarios.tipoEgresoUsuarios, {nullable: false,})
    @JoinColumn({name: 'rutUsuario'})
    rutUsuario: SystemUser | null;

    @Column("bit", {
        nullable: false,
        name: "estado"
    })
    estado: boolean;

    @Column("bit", {
        nullable: true,
        name: "selDefault"
    })
    selDefault: boolean | null;

    @PrimaryGeneratedColumn({
        type: "numeric",
        name: "id"
    })
    id: number;

}
