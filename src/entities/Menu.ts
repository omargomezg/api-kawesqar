import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserMenu} from "./UserMenu";

@Entity("menu", {schema: "dbo"})
export class Menu {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int"
    })
    id: number;

    @Column("int", {
        name: "parent",
        nullable: false
    })
    parent: number;

    @Column("nvarchar", {
        length: 50,
        name: "texto",
        nullable: false
    })
    name: string;

    @Column("nvarchar", {
        name: "url",
        nullable: false
    })
    url: string;

    @OneToMany(
        (type: UserMenu) => UserMenu,
        (userMenu: UserMenu) => userMenu.menu)
    userMenus: UserMenu[];

}
