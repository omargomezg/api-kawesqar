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
import {Products} from "./Products";
import {facturas} from "./facturas";
import {Branch} from "./Branch";
import {SystemUser} from "./SystemUser";
import {Store} from "./Store";

@Entity("DesgloseArticulo", {schema: "dbo"})
export class DesgloseArticulo {

    @ManyToOne(type => Products, articulos => articulos.desgloseArticulos, {nullable: false,})
    @JoinColumn({name: "article_id", referencedColumnName: "idArticulo"})
    idArticulo: Products | null;

    @PrimaryGeneratedColumn({
        type: "int",
        name: "ID"
    })
    ID: number;

    @Column("datetime", {
        nullable: false,
        name: "FechaIng"
    })
    FechaIng: Date;

    @Column("money", {
        nullable: false,
        name: "artValor"
    })
    artValor: number;

    @ManyToOne(type => facturas, facturas => facturas.desgloseArticulos, {})
    @JoinColumn({name: 'idFact'})
    idFact: facturas | null;

    @Column("datetime", {
        nullable: true,
        name: "Vencimiento"
    })
    Vencimiento: Date | null;

    @ManyToOne(type => Branch, cs_sucursales => cs_sucursales.desgloseArticulos, {})
    @JoinColumn({name: 'idSucursal'})
    idSucursal: Branch | null;

    @Column("bit", {
        nullable: true,
        default: () => "(1)",
        name: "estado"
    })
    estado: boolean | null;

    @Column("bit", {
        nullable: true,
        default: () => "(0)",
        name: "estadoUso"
    })
    estadoUso: boolean | null;

    @ManyToOne(type => SystemUser, cs_usuarios => cs_usuarios.desgloseArticulos, {})
    @JoinColumn({name: 'rutUsuario'})
    rutUsuario: SystemUser | null;

    @Column("int", {
        nullable: true,
        default: () => "(0)",
        name: "granel"
    })
    granel: number | null;

    @Column("int", {
        nullable: true,
        name: "granelOriginal"
    })
    granelOriginal: number | null;

    @ManyToOne(type => Store, bodega => bodega.desgloseArticulos, {})
    @JoinColumn({name: 'idBodega'})
    idBodega: Store | null;

}
