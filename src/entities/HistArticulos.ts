import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {comprobanteEgreso} from "./comprobanteEgreso";
import {facturas} from "./facturas";
import {Product} from "./Product";

@Entity("histArticulos", {schema: "dbo"})
export class HistArticulos {

    @ManyToOne(type => comprobanteEgreso, comprobanteEgreso => comprobanteEgreso.histArticuloss, {nullable: false,})
    @JoinColumn({name: 'IdFolio'})
    idFolio: comprobanteEgreso | null;

    @ManyToOne(type => Product, articulos => articulos.histArticuloss, {nullable: false,})
    @JoinColumn({name: "article_id", referencedColumnName: "idArticulo"})
    idArticulo: Product | null;

    @Column("int", {
        nullable: false,
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
        name: "ArtValor"
    })
    ArtValor: number;

    @ManyToOne(type => facturas, facturas => facturas.histArticuloss, {})
    @JoinColumn({name: 'IdFact'})
    idFact: facturas | null;

    @Column("datetime", {
        nullable: false,
        default: () => "'01/01/1900 0:00:00'",
        name: "Vencimiento"
    })
    Vencimiento: Date;

    @Column("int", {
        nullable: true,
        name: "idSucursal"
    })
    idSucursal: number | null;

    @Column("bit", {
        nullable: true,
        name: "estado"
    })
    estado: boolean | null;

    @Column("bit", {
        nullable: true,
        name: "estadoUso"
    })
    estadoUso: boolean | null;

    @Column("varchar", {
        nullable: true,
        length: 12,
        name: "rutusuario"
    })
    rutusuario: string | null;

    @Column("int", {
        nullable: true,
        name: "granelOriginal"
    })
    granelOriginal: number | null;

    @Column("int", {
        nullable: true,
        name: "idBodega"
    })
    idBodega: number | null;

    @PrimaryGeneratedColumn({
        type: "numeric",
        name: "idtable"
    })
    idtable: number;

}
