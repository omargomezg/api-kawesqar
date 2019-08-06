import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "./Client";
import {Branch} from "./Branch";
import {Proveedor} from "./Proveedor";
import {provincias} from "./provincias";

@Entity("comunas", {schema: "dbo"})
export class Commune {

    @PrimaryGeneratedColumn({
        name: "codigo",
        type: "int"
    })
    codigo: number;

    @ManyToOne(type => provincias, provincias => provincias.comunass, {nullable: false,})
    @JoinColumn({name: "padre"})
    padre: provincias | null;

    @Column("varchar", {
        name: "nombre",
        nullable: false
    })
    name: string;

    @OneToMany(type => Client, clientes => clientes.commune)
    clientess: Client[];

    @OneToMany(type => Branch, cs_sucursales => cs_sucursales.commune)
    branches: Branch[];

    @OneToMany(type => Proveedor, proveedor => proveedor.comuna)
    proveedors: Proveedor[];

}
