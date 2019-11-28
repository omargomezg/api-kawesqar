import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MovimientoArticulo } from "./movimientoArticulo";
import { Product } from "./Product";

@Entity("cartolaProducto", { schema: "dbo" })
export class CartolaProducto extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idCP",
        type: "int"
    })
    id: number;

    @Column("datetime", {
        name: "fecha",
        nullable: false
    })
    fecha: Date;

    @Column("int", {
        name: "cantidad",
        nullable: false
    })
    cantidad: number;

    @Column("money", {
        default: () => "(0)",
        name: "valor",
        nullable: false
    })
    valor: number;

    @Column("money", {
        name: "saldo",
        nullable: false
    })
    saldo: number;

    @Column("int", {
        name: "idSucursal",
        nullable: false
    })
    idSucursal: number;

    @Column("nvarchar", {
        name: "comentarios",
        nullable: true
    })
    comments: string | null;

    @ManyToOne(
        (type: Product) => Product,
        (product: Product) => product.cartolaProductos,
        { nullable: false })
    @JoinColumn({ name: "article_id", referencedColumnName: "id" })
    product: Product | null;

    @ManyToOne(
        (type: MovimientoArticulo) => MovimientoArticulo,
        (movimientoArticulo: MovimientoArticulo) => movimientoArticulo.cartolaProductos,
        { nullable: false })
    @JoinColumn({ name: "idMovimiento" })
    idMovimiento: MovimientoArticulo | null;

}
