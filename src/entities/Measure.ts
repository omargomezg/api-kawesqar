import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity("Medidas", { schema: "dbo" })
export class Measure extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "IdMedida",
        type: "int",
    })
    id: number;

    @Column("nvarchar", {
        length: 50,
        name: "NomMedida",
        nullable: false,
    })
    name: string;

    @Column("nvarchar", {
        length: 50,
        name: "nomPlural",
        nullable: true,
    })
    nomPlural: string | null;

    @Column("datetime", {
        default: () => "getdate()",
        name: "lastupdate",
        nullable: false,
    })
    lastupdate: Date;

    @OneToMany(
        (type: Product) => Product,
        (product: Product) => product.measure)
    products: Product[];

    @OneToMany(
        (type: Product) => Product,
        (articulos: Product) => articulos.idMedidaGranel)
    articuloss2: Product[];

}
