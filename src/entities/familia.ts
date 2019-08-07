import {Length} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {sucursalAsociada} from "./sucursalAsociada";

@Entity("familia", {schema: "dbo"})
export class familia {

    @PrimaryGeneratedColumn({
        name: "idFamilia",
        type: "int"
    })
    id: number;

    @Column("nvarchar", {
        length: 100,
        name: "NomFamilia",
        nullable: true,
    })
    @Length(0, 100)
    name: string | null;

    @Column("bit", {
        name: "Estado",
        nullable: true
    })
    isActive: boolean | null;

    @OneToMany(type => Product, articulos => articulos.idFamilia)
    articuloss: Product[];

    @OneToMany(type => sucursalAsociada, sucursalAsociada => sucursalAsociada.idFamilia)
    sucursalAsociadas: sucursalAsociada[];

}