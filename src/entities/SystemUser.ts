import {Column, Entity, OneToMany, OneToOne} from "typeorm";
import {Branch} from "./Branch";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {eliminaVenta} from "./eliminaVenta";
import {facturas} from "./facturas";
import {Person} from "./Person";
import {RelacionUsuarioRol} from "./RelacionUsuarioRol";
import {RelationSystemUserBranch} from "./RelationSystemUserBranch";
import {RelationSystemUserOutputType} from "./RelationSystemUserOutputType";
import {ShoppingCart} from "./ShoppingCart";
import {UserMenu} from "./UserMenu";

@Entity("cs_usuarios", {schema: "dbo"})
export class SystemUser extends Person {

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

    @Column("varbinary", {
        name: "clave",
        nullable: false,
        select: false
    })
    clave: Buffer;

    @Column("varchar", {
        length: 50,
        name: "userName",
        nullable: false,
    })
    userName: string;

    @Column("datetime", {name: "fechaCreacion"})
    created: Date;

    @Column("image", {
        name: "imagenPerfil",
        nullable: true
    })
    imagenPerfil: Buffer | null;

    @Column("varchar", {
        name: "imagenTipo",
        nullable: true
    })
    imagenTipo: string | null;

    @Column("bit", {
        default: () => "(0)",
        name: "salidaVenta",
        nullable: false,
    })
    salidaVenta: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "salidaFactura",
        nullable: false,
    })
    salidaFactura: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "salidaEmpleados",
        nullable: false
    })
    salidaEmpleados: boolean;

    @Column("bit", {
        name: "traspaso",
        nullable: false
    })
    traspaso: boolean;

    @Column("bit", {
        name: "credito",
        nullable: false
    })
    credito: boolean;

    @Column("bit", {
        default: () => "(0)",
        name: "discount",
        nullable: true
    })
    discount: boolean | null;

    @OneToOne((type: Branch) => Branch,
        (branch: Branch) => branch.legalRepresentative)
    branch: Branch;

    @OneToOne(
        (type: ShoppingCart) => ShoppingCart,
        (shoppingCart: ShoppingCart) => shoppingCart.systemUser)
    shoppingCart: ShoppingCart;

    @OneToMany(
        (type: RelacionUsuarioRol) => RelacionUsuarioRol,
        (relacionUsuarioRol: RelacionUsuarioRol) => relacionUsuarioRol.user)
    RelacionUsuarioRols: RelacionUsuarioRol[];

    @OneToMany(
        (type: RelationSystemUserBranch) => RelationSystemUserBranch,
        (userBranch: RelationSystemUserBranch) => userBranch.systemUser)
    relationSystemUserBranch: RelationSystemUserBranch[];

    @OneToMany((type: DesgloseArticulo) => DesgloseArticulo,
        (desgloseArticulo: DesgloseArticulo) => desgloseArticulo.rutUsuario)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(type => eliminaVenta, eliminaVenta => eliminaVenta.rutUsuario)
    eliminaVentas: eliminaVenta[];

    @OneToMany(type => eliminaVenta, eliminaVenta => eliminaVenta.rutUsuario)
    eliminaVentas2: eliminaVenta[];

    @OneToMany(type => facturas, facturas => facturas.rutUsuario)
    facturass: facturas[];

    @OneToMany(type => UserMenu, menuUsuario => menuUsuario.systemUser)
    menuUsuarios: UserMenu[];

    @OneToMany(type => RelationSystemUserOutputType, tipoEgreso_Usuario => tipoEgreso_Usuario.systemUser)
    tipoEgresoUsuarios: RelationSystemUserOutputType[];

}
