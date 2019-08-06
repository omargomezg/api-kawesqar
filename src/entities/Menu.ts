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
import {UserMenu} from "./UserMenu";

@Entity("menu", {schema: "dbo"})
export class Menu {

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

    @OneToMany(type => UserMenu, menuUsuario => menuUsuario.menu)
    menuUsuarios: UserMenu[];

}
