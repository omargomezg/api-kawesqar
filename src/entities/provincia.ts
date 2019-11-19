import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Region} from "./region";
import {Commune} from "./Commune";


@Entity("provincias", {schema: "dbo"})
export class Provincia {

    @PrimaryGeneratedColumn({
        name: "codigo",
        type: "int"
    })
    codigo: number;

    @ManyToOne((type: Region) => Region,
        (region: Region) => region.provincias,
        {nullable: false})
    @JoinColumn({name: "padre"})
    padre: Region | null;

    @Column("varchar", {
        default: () => "NULL",
        name: "nombre",
        nullable: false
    })
    name: string;

    @Column("tinyint", {
        default: () => "'1'",
        name: "activo",
        nullable: false
    })
    isActive: number;

    @OneToMany(
        (type: Commune) => Commune,
        (commune: Commune) => commune.father)
    communes: Commune[];

}
