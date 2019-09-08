import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {Invoice} from "./Invoice";
import {Product} from "./Product";
import {Store} from "./Store";
import {SystemUser} from "./SystemUser";

@Entity("DesgloseArticulo", {schema: "dbo"})
export class DesgloseArticulo extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "ID",
        type: "int"
    })
    id: number;

    @Column("datetime", {
        name: "FechaIng",
        nullable: false
    })
    created: Date;

    @Column("money", {
        name: "artValor",
        nullable: false
    })
    artValor: number;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

    @Column("datetime", {
        name: "Vencimiento",
        nullable: true
    })
    expirationDate: Date | null;

    @ManyToOne(
        (type: Product) => Product,
        (product: Product) => product.desgloseArticulos,
        {nullable: false})
    @JoinColumn({name: "article_id", referencedColumnName: "id"})
    product: Product | null;

    @ManyToOne(
        (type: Invoice) => Invoice,
        (invoice: Invoice) => invoice.desgloseArticulos)
    @JoinColumn({name: "idFact"})
    invoice: Invoice | null;

    @ManyToOne(
        (type: Branch) => Branch,
            (branch: Branch) => branch.desgloseArticulos)
    @JoinColumn({name: "idSucursal"})
    branch: Branch | null;

    @Column("bit", {
        default: () => "(0)",
        name: "estadoUso",
        nullable: true
    })
    estadoUso: boolean | null;

    @ManyToOne(
        (type: SystemUser) => SystemUser,
            (systemUser: SystemUser) => systemUser.desgloseArticulos)
    @JoinColumn({name: "rutUsuario"})
    user: SystemUser | null;

    @Column("int", {
        default: () => "(0)",
        name: "granel",
        nullable: true
    })
    granel: number | null;

    @Column("int", {
        name: "granelOriginal",
        nullable: true
    })
    granelOriginal: number | null;

    @ManyToOne(type => Store, bodega => bodega.desgloseArticulos, {})
    @JoinColumn({name: 'idBodega'})
    idBodega: Store | null;

}
