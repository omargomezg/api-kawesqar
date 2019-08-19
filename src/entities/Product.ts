import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {cartolaProducto} from "./cartolaProducto";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {detalleExistencia} from "./detalleExistencia";
import {detalleFactura} from "./detalleFactura";
import {detalleVenta} from "./detalleVenta";
import {Family} from "./Family";
import {HistArticulos} from "./HistArticulos";
import {Medidas} from "./Medidas";
import {ShoppingCartContent} from "./ShoppingCartContent";
import {TempArt} from "./TempArt";

@Entity("Articulos", {schema: "dbo"})
export class Product {

    @PrimaryColumn("nvarchar", {
        length: 50,
        name: "idArticulo",
        nullable: false,
        primary: true,
    })
    @Index()
    idArticulo: string;

    @Column("nvarchar", {
        length: 50,
        name: "nomArticulo",
        nullable: false
    })
    nomArticulo: string;

    @ManyToOne(type => Medidas, medidas => medidas.articuloss, {})
    @JoinColumn({name: 'idMedida'})
    idMedida: Medidas | null;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true,
    })
    estado: boolean | null;

    @Column("int", {
        default: () => "(0)",
        name: "Alerta",
        nullable: true
    })
    Alerta: number | null;

    @Column("bit", {
        default: () => "(0)",
        name: "estadoAlerta",
        nullable: true
    })
    estadoAlerta: boolean | null;

    @Column("bit", {
        name: "vencimiento",
        nullable: true,
    })
    vencimiento: boolean | null;

    @Column("nvarchar", {
        default: () => "'Sin Observaciones'",
        name: "Notas",
        nullable: true,
    })
    Notas: string | null;

    @Column("money", {
        default: () => "(0)",
        name: "ganancia",
        nullable: true,
    })
    ganancia: number | null;

    @ManyToOne(
        (type: Family) => Family,
            (family: Family) => family.products, {})
    @JoinColumn({name: "idFamilia"})
    family: Family | null;

    @Column("smallmoney", {
        default: () => "(0)",
        name: "precioGranel",
        nullable: true,
    })
    precioGranel: number | null;

    @ManyToOne(type => Medidas, medidas => medidas.articuloss2, {})
    @JoinColumn({name: "idMedidaGranel"})
    idMedidaGranel: Medidas | null;

    @Column("bit", {
        default: () => "(1)",
        name: "usaInventario",
        nullable: false,
    })
    usaInventario: boolean;

    @Column("int", {
        default: () => "(0)",
        name: "folio",
        nullable: true,
    })
    folio: number | null;

    @Column("image", {
        name: "img_file",
        nullable: true,
    })
    img_file: Buffer | null;

    @Column("varchar", {
        name: "img_content_type",
        nullable: true,
    })
    img_content_type: string | null;

    @OneToMany(type => cartolaProducto, cartolaProducto => cartolaProducto.idArticulo)
    cartolaProductos: cartolaProducto[];

    @OneToMany(type => DesgloseArticulo, desgloseArticulo => desgloseArticulo.idArticulo)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(type => detalleExistencia, detalleExistencia => detalleExistencia.idArticulo)
    detalleExistencias: detalleExistencia[];

    @OneToMany(type => detalleFactura, detalleFactura => detalleFactura.idArticulo)
    detalleFacturas: detalleFactura[];

    @OneToMany(type => detalleVenta, detalleVenta => detalleVenta.idArticulo)
    detalleVentas: detalleVenta[];

    @OneToMany(type => HistArticulos, histArticulos => histArticulos.idArticulo)
    histArticuloss: HistArticulos[];

    @OneToMany(type => TempArt, tempArt => tempArt.idArticulo)
    tempArts: TempArt[];

    @OneToMany(type => ShoppingCartContent, shoppingCartContent => shoppingCartContent.idArticulo)
    tempCarros: ShoppingCartContent[];

}
