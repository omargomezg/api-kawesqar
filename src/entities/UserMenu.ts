import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Menu} from "./Menu";
import {SystemUser} from "./SystemUser";

@Entity("menuUsuario", {schema: "dbo"})
export class UserMenu {

    @PrimaryGeneratedColumn({
        name: "idMenuUsuario",
        type: "int",
    })
    id: number;

    @ManyToOne(
        (type: Menu) => Menu,
        (menu: Menu) => menu.menuUsuarios, {nullable: false})
    @JoinColumn({name: "id"})
    menu: Menu | null;

    @ManyToOne(
        (type: SystemUser) => SystemUser,
        (systemUser: SystemUser) => systemUser.menuUsuarios, {nullable: false})
    @JoinColumn({name: "rutUsuario"})
    systemUser: SystemUser | null;

    @Column("bit", {
        name: "estado",
        nullable: true,
    })
    isActive: boolean | null;

}
