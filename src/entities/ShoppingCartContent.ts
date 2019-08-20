import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {ShoppingCart} from "./ShoppingCart";
import {Store} from "./Store";

@Entity("TempCarro", {schema: "dbo"})
export class ShoppingCartContent {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "int",
    })
    id: number;

    @ManyToOne(
        (type: Product) => Product,
        (products: Product) => products.shoppingCartContent)
    @JoinColumn({name: "article_id", referencedColumnName: "id"})
    products: Product | null;

    @Column("int", {
        name: "cantidad",
        nullable: true,
    })
    cantidad: number | null;

    @Column("varchar", {
        length: 12,
        name: "rutUsuario",
        nullable: false,
    })
    rutUsuario: string;

    @Column("money", {
        name: "valor",
        nullable: false,
    })
    valor: number;

    @Column("bit", {
        name: "estado",
        nullable: true,
    })
    estado: boolean | null;

    @Column("int", {
        name: "idArticuloID",
        nullable: true,
    })
    idArticuloID: number | null;

    @ManyToOne(
        (type: Store) => Store,
        (store: Store) => store.content, {})
    @JoinColumn({name: "idSucursal"})
    store: Store | null;

    @ManyToOne((
        type: ShoppingCart) => ShoppingCart,
        (shoppingCart: ShoppingCart) => shoppingCart.contents
    )
    content: ShoppingCart;
}
