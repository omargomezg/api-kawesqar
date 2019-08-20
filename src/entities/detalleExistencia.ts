import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {existencia} from "./existencia";
import {Product} from "./Product";
import {Store} from "./Store";

@Entity("detalleExistencia", {schema: "dbo"})
export class detalleExistencia {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "idDetalleExistencia"
    })
    idDetalleExistencia: number;

    @ManyToOne(type => existencia, existencia => existencia.detalleExistencias, {nullable: false,})
    @JoinColumn({name: 'idExistencia'})
    idExistencia: existencia | null;

    @ManyToOne(type => Product, articulos => articulos.detalleExistencias, {nullable: false,})
    @JoinColumn({name: "article_id", referencedColumnName: "id"})
    idArticulo: Product | null;

    @Column("int", {
        name: "cantidad",
        nullable: false
    })
    cantidad: number;

    @Column("money", {
        name: "valorUnitario",
        nullable: false
    })
    valorUnitario: number;

    @Column("bit", {
        name: "esGranel",
        nullable: true
    })
    esGranel: boolean | null;

    @ManyToOne(
        (type: Store) => Store,
        (store: Store) => store.detalleExistencias)
    @JoinColumn({name: "idbodega"})
    store: Store | null;

}
