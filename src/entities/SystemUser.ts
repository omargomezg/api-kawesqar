import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Branch } from "./Branch";
import { DesgloseArticulo } from "./DesgloseArticulo";
import { EliminaVenta } from "./EliminaVenta";
import { Invoice } from "./Invoice";
import { Person } from "./Person";
import { RelacionUsuarioRol } from "./RelacionUsuarioRol";
import { RelationSystemUserBranch } from "./RelationSystemUserBranch";
import { RelationSystemUserOutputType } from "./RelationSystemUserOutputType";
import { ShoppingCart } from "./ShoppingCart";
import { TurnoVenta } from "./TurnoVenta";
import { UserMenu } from "./UserMenu";

@Entity("cs_usuarios", { schema: "dbo" })
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
    password: Buffer;

    @Column("varchar", {
        length: 50,
        name: "userName",
        nullable: false,
    })
    userName: string;

    @Column("datetime", { name: "fechaCreacion" })
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
        (desgloseArticulo: DesgloseArticulo) => desgloseArticulo.user)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(
        (type: EliminaVenta) => EliminaVenta,
        (eliminaVenta: EliminaVenta) => eliminaVenta.systemUser)
    eliminaVentas: EliminaVenta[];

    @OneToMany(
        (type: Invoice) => Invoice,
        (invoice: Invoice) => invoice.systemUser)
    invoices: Invoice[];

    @OneToMany(
        (type) => UserMenu,
        (menuUsuario: UserMenu) => menuUsuario.systemUser)
    menuUsuarios: UserMenu[];

    @OneToMany((type) => RelationSystemUserOutputType,
        (userOutputType: RelationSystemUserOutputType) => userOutputType.systemUser)
    tipoEgresoUsuarios: RelationSystemUserOutputType[];

    @OneToMany((type) => TurnoVenta,
        (turnoVeta: TurnoVenta) => turnoVeta.systemUser)
    turnoVenta: TurnoVenta[];

}
