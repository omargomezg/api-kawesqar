import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Existencia} from "./Existencia";
import {Product} from "./Product";
import {Store} from "./Store";

@Entity("detalleExistencia", {schema: "dbo"})
export class DetalleExistencia extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idDetalleExistencia",
        type: "int"
    })
    idDetalleExistencia: number;

    @Column("int", {
        name: "cantidad",
        nullable: false
    })
    cantidad: number;

    @Column("bit", {
        name: "esGranel",
        nullable: true
    })
    esGranel: boolean | null;

    @Column("money", {
        name: "valorUnitario",
        nullable: false
    })
    valorUnitario: number;

    @ManyToOne(
        (type: Existencia) => Existencia,
        (existencia: Existencia) => existencia.detalleExistencias,
        {nullable: false})
    @JoinColumn({name: "idExistencia"})
    existencia: Existencia | null;

    @ManyToOne(
        (type: Product) => Product,
        (product: Product) => product.detalleExistencias,
        {nullable: false})
    @JoinColumn({name: "article_id", referencedColumnName: "id"})
    product: Product | null;

    @ManyToOne(
        (type: Store) => Store,
        (store: Store) => store.detalleExistencias)
    @JoinColumn({name: "idbodega"})
    store: Store | null;

}
