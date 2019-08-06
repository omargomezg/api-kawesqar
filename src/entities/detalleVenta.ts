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
import {comprobanteEgreso} from "./comprobanteEgreso";
import {Product} from "./Product";

@Entity("detalleVenta", {schema: "dbo"})
export class detalleVenta {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "idDetalleVenta"
    })
    idDetalleVenta: number;

    @ManyToOne(type => comprobanteEgreso, comprobanteEgreso => comprobanteEgreso.detalleVentas, {nullable: false,})
    @JoinColumn({name: 'idFolio'})
    idFolio: comprobanteEgreso | null;

    @Column("int", {
        nullable: false,
        name: "cantidad"
    })
    cantidad: number;

    @ManyToOne(type => Product, articulos => articulos.detalleVentas, {nullable: false,})
    @JoinColumn({name: "article_id", referencedColumnName: "idArticulo"})
    idArticulo: Product | null;

    @Column("money", {
        nullable: false,
        name: "valorTotal"
    })
    valorTotal: number;

    @Column("bit", {
        nullable: false,
        name: "vGranel"
    })
    vGranel: boolean;

    @Column("int", {
        nullable: true,
        name: "idArticuloID"
    })
    idArticuloID: number | null;

    @Column("money", {
        nullable: true,
        name: "vCosto"
    })
    vCosto: number | null;

    @Column("bit", {
        nullable: true,
        name: "f"
    })
    f: boolean | null;

}
