import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Movimientos} from "./Movimientos";

@Entity("tipoMovimiento", {schema: "dbo"})
export class TipoMovimiento extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idTipoMovimiento",
        type: "int"
    })
    id: number;

    @Column("nvarchar", {
        length: 50,
        name: "descripcion",
        nullable: false
    })
    description: string;

    @OneToMany(
        (type: Movimientos) => Movimientos,
        (movimientos: Movimientos) => movimientos.tipoMovimiento)
    movimientos: Movimientos[];

}
