import { Length } from "class-validator";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Branch } from "./Branch";
import { cs_relacion_usuarioRol } from "./cs_relacion_usuarioRol";
import { cs_relacion_usuarioSucursal } from "./cs_relacion_usuarioSucursal";
import { DesgloseArticulo } from "./DesgloseArticulo";
import { eliminaVenta } from "./eliminaVenta";
import { facturas } from "./facturas";
import { UserMenu } from "./UserMenu";
import { tipoEgreso_Usuario } from "./tipoEgreso_Usuario";
import { Person } from "./Person";

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
        nullable: false
    })
    clave: Buffer;

    @Column("varchar", {
        length: 50,
        name: "userName",
        nullable: false,
    })
    userName: string;

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

    @OneToOne(type => Branch, branch => branch.legalRepresentative)
    branch: Branch;

    @OneToMany(type => cs_relacion_usuarioRol, cs_relacion_usuarioRol => cs_relacion_usuarioRol.user)
    csRelacionUsuarioRols: cs_relacion_usuarioRol[];

    @OneToMany(
        (type: cs_relacion_usuarioSucursal) => cs_relacion_usuarioSucursal,
            (cs_relacion_usuarioSucursal: cs_relacion_usuarioSucursal) => cs_relacion_usuarioSucursal.rutUsuario)
    csRelacionUsuarioSucursals: cs_relacion_usuarioSucursal[];

    @OneToMany(type => DesgloseArticulo, desgloseArticulo => desgloseArticulo.rutUsuario)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(type => eliminaVenta, eliminaVenta => eliminaVenta.rutUsuario)
    eliminaVentas: eliminaVenta[];

    @OneToMany(type => eliminaVenta, eliminaVenta => eliminaVenta.rutUsuario)
    eliminaVentas2: eliminaVenta[];

    @OneToMany(type => facturas, facturas => facturas.rutUsuario)
    facturass: facturas[];

    @OneToMany(type => UserMenu, menuUsuario => menuUsuario.systemUser)
    menuUsuarios: UserMenu[];

    @OneToMany(type => tipoEgreso_Usuario, tipoEgreso_Usuario => tipoEgreso_Usuario.rutUsuario)
    tipoEgresoUsuarios: tipoEgreso_Usuario[];

}
