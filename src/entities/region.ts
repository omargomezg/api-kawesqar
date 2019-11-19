import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Provincia} from "./provincia";


@Entity("regiones", {schema: "dbo"})
export class Region {

    @PrimaryGeneratedColumn({
        name: "codigo",
        type: "int"
    })
    code: number;

    @Column("varchar", {
        default: () => "NULL",
        length: 60,
        name: "nombre",
        nullable: true
    })
    name: string | null;

    @Column("nchar", {
        default: () => "'0'",
        length: 4,
        name: "idRomano",
        nullable: false
    })
    idRomano: string;

    @Column("bit", {
        default: () => "(1)",
        name: "activo",
        nullable: false
    })
    isActive: boolean;

    @OneToMany(type => Provincia, provincias => provincias.padre)
    provincias: Provincia[];

}
