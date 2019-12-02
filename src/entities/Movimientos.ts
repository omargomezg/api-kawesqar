import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Cartola} from "./Cartola";
import {TipoMovimiento} from "./TipoMovimiento";

@Entity("movimientos", {schema: "dbo"})
export class Movimientos {

    @Column("int", {
        name: "idMovimiento",
        nullable: false,
        primary: true
    })
    id: number;

    @Column("nvarchar", {
        name: "descripcion",
        nullable: false
    })
    name: string;

    @ManyToOne(
        (type: TipoMovimiento) => TipoMovimiento,
            (tipoMovimiento: TipoMovimiento) => tipoMovimiento.movimientos,
        {nullable: false})
    @JoinColumn({name: "idTipoMovimiento"})
    tipoMovimiento: TipoMovimiento | null;

    @OneToMany((type: Cartola) => Cartola,
        (cartola: Cartola) => cartola.idMovimiento)
    cartolas: Cartola[];

}
