import {IsEmail} from "class-validator";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Commune} from "./Commune";
import {Invoice} from "./Invoice";

@Entity("proveedor", {schema: "dbo"})
export class Supplier {

    @Column("nvarchar", {
        length: 10,
        name: "ProvRut",
        nullable: false,
        primary: true,
    })
    rut: string;

    @Column("nvarchar", {
        length: 150,
        name: "ProvNombre",
        nullable: false
    })
    ProvNombre: string;

    @Column("nchar", {
        length: 15,
        name: "ProvFono",
        nullable: true
    })
    telephone: string | null;

    @Column("nchar", {
        length: 15,
        name: "ProvFax",
        nullable: true
    })
    ProvFax: string | null;

    @Column("nchar", {
        length: 15,
        name: "ProvCelular",
        nullable: true
    })
    mobile: string | null;

    @Column("nvarchar", {
        length: 50,
        name: "ProvDireccion",
        nullable: true
    })
    address: string | null;

    @Column("nvarchar", {
        length: 50,
        name: "ProvMail",
        nullable: true
    })
    @IsEmail()
    email: string | null;

    @Column("nvarchar", {
        length: 50,
        name: "ProvWeb",
        nullable: true
    })
    webSite: string | null;

    @Column("bit", {
        name: "ProvEstado",
        nullable: true
    })
    isActive: boolean | null;

    @ManyToOne(
        (type: Commune) => Commune,
            (comunas: Commune) => comunas.supplier)
    @JoinColumn({name: "codigo"})
    commune: Commune | null;

    @Column("nchar", {
        length: 10,
        name: "ProvAbreviacion",
        nullable: true
    })
    ProvAbreviacion: string | null;

    @OneToMany(
        (type: Invoice) => Invoice,
            (invoice: Invoice) => invoice.supplier)
    invoices: Invoice[];

}
