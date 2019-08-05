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
import {menu} from "./Menu";
import {SystemUser} from "./SystemUser";

@Entity("menuUsuario", {schema: "dbo"})
export class menuUsuario {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "idMenuUsuario"
    })
    idMenuUsuario: number;

    @ManyToOne(type => menu, menu => menu.menuUsuarios, {nullable: false,})
    @JoinColumn({name: 'id'})
    menu: menu | null;

    @ManyToOne(type => SystemUser, cs_usuarios => cs_usuarios.menuUsuarios, {nullable: false,})
    @JoinColumn({name: 'rutUsuario'})
    rutUsuario: SystemUser | null;

    @Column("bit", {
        nullable: true,
        name: "estado"
    })
    estado: boolean | null;

}
