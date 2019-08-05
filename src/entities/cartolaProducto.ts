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
import {movimientoArticulo} from "./movimientoArticulo";

@Entity("cartolaProducto", {schema: "dbo"})
export class cartolaProducto {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "idCP"
    })
    idCP: number;

    @ManyToOne(type => Products, articulos => articulos.cartolaProductos, {nullable: false,})
    @JoinColumn({name: "article_id", referencedColumnName: "idArticulo"})
    idArticulo: Products | null;

    @Column("datetime", {
        nullable: false,
        name: "fecha"
    })
    fecha: Date;

    @ManyToOne(type => movimientoArticulo, movimientoArticulo => movimientoArticulo.cartolaProductos, {nullable: false,})
    @JoinColumn({name: "idMovimiento"})
    idMovimiento: movimientoArticulo | null;

    @Column("int", {
        nullable: false,
        name: "cantidad"
    })
    cantidad: number;

    @Column("money", {
        nullable: false,
        default: () => "(0)",
        name: "valor"
    })
    valor: number;

    @Column("money", {
        nullable: false,
        name: "saldo"
    })
    saldo: number;

    @Column("int", {
        nullable: false,
        name: "idSucursal"
    })
    idSucursal: number;

    @Column("nvarchar", {
        nullable: true,
        name: "comentarios"
    })
    comentarios: string | null;

}
