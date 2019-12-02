import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {Client} from "./Client";
import {Provincia} from "./provincia";
import {Supplier} from "./Supplier";

@Entity("comunas", {schema: "dbo"})
export class Commune extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "codigo",
        type: "int"
    })
    code: number;

    @Column("varchar", {
        name: "nombre",
        nullable: false
    })
    name: string;

    @ManyToOne(type => Provincia, provincias => provincias.communes, {nullable: false,})
    @JoinColumn({name: "padre"})
    father: Provincia | null;

    @OneToMany(
        (type: Client) => Client,
        (client: Client) => client.commune)
    clients: Client[];

    @OneToMany(
        (type: Branch) => Branch,
            (branch: Branch) => branch.commune)
    branches: Branch[];

    @OneToMany(
        (type: Supplier) => Supplier,
        (supplier: Supplier) => supplier.commune)
    supplier: Supplier[];

}
