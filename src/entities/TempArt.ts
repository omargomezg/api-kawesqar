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
import {Store} from "./Store";

@Entity("TempArt", {schema: "dbo"})
export class TempArt {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "ID"
    })
    ID: number;

    @ManyToOne(type => Products, articulos => articulos.tempArts, {nullable: false,})
    @JoinColumn({name: "article_id", referencedColumnName: "idArticulo"})
    idArticulo: Products | null;

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

    @Column("int", {
        nullable: false,
        name: "ArtCantidad"
    })
    ArtCantidad: number;

    @ManyToOne(type => facturas, facturas => facturas.tempArts, {nullable: false,})
    @JoinColumn({name: 'IdFact'})
    idFact: facturas | null;

    @Column("datetime", {
        nullable: true,
        name: "Vencimiento"
    })
    Vencimiento: Date | null;

    @ManyToOne(type => Branch, cs_sucursales => cs_sucursales.tempArts, {nullable: false,})
    @JoinColumn({name: 'idSucursal'})
    idSucursal: Branch | null;

    @ManyToOne(type => Store, bodega => bodega.tempArts, {nullable: false,})
    @JoinColumn({name: 'idBodega'})
    idBodega: Store | null;

}
