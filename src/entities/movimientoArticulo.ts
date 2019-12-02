import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartolaProducto } from "./CartolaProducto";

@Entity("movimientoArticulo", { schema: "dbo" })
export class MovimientoArticulo {

    @PrimaryGeneratedColumn({
        name: "idMovimiento",
        type: "int",
    })
    public idMovimiento: number;

    @Column("nvarchar", {
        length: 50,
        name: "descripcion",
        nullable: false
    })
    public descripcion: string;

    @Column("nchar", {
        name: "tipo",
        nullable: false,
    })
    public tipo: string;

    @OneToMany(
        (type) => CartolaProducto,
        (cartolaProducto) => cartolaProducto.idMovimiento)
    public cartolaProductos: CartolaProducto[];

}
