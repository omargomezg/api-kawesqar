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
import {menuUsuario} from "./menuUsuario";

@Entity("menu", {schema: "dbo"})
export class menu {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @Column("int", {
        nullable: false,
        name: "parent"
    })
    parent: number;

    @Column("nvarchar", {
        nullable: false,
        length: 50,
        name: "texto"
    })
    texto: string;

    @Column("nvarchar", {
        nullable: false,
        name: "url"
    })
    url: string;

    @OneToMany(type => menuUsuario, menuUsuario => menuUsuario.menu)
    menuUsuarios: menuUsuario[];

}
