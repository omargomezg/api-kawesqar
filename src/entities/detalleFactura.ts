import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {facturas} from "./facturas";
import {Product} from "./Product";

@Entity("detalleFactura", {schema: "dbo"})
export class detalleFactura {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "idDetalle"
    })
    idDetalle: number;

    @ManyToOne(type => facturas, facturas => facturas.detalleFacturas, {nullable: false,})
    @JoinColumn({name: 'idFact'})
    idFact: facturas | null;

    @ManyToOne(type => Product, articulos => articulos.detalleFacturas, {nullable: false,})
    @JoinColumn({name: "article_id", referencedColumnName: "idArticulo"})
    idArticulo: Product | null;

    @Column("money", {
        nullable: false,
        name: "valUnitario"
    })
    unit_value: number;

    @Column("int", {
        nullable: false,
        name: "cantidad"
    })
    cantidad: number;

}
