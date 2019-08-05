import {IsEmail} from "class-validator";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Commune} from "./Commune";
import {facturas} from "./facturas";

@Entity("proveedor", {schema: "dbo"})
export class Proveedor {

    @Column("nvarchar", {
        length: 10,
        name: "ProvRut",
        nullable: false,
        primary: true,
    })
    rut: string;

    @Column("nvarchar", {
        nullable: false,
        length: 150,
        name: "ProvNombre"
    })
    ProvNombre: string;

    @Column("nchar", {
        nullable: true,
        length: 15,
        name: "ProvFono"
    })
    ProvFono: string | null;

    @Column("nchar", {
        nullable: true,
        length: 15,
        name: "ProvFax"
    })
    ProvFax: string | null;

    @Column("nchar", {
        nullable: true,
        length: 15,
        name: "ProvCelular"
    })
    mobile: string | null;

    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "ProvDireccion"
    })
    ProvDireccion: string | null;

    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "ProvMail"
    })
    @IsEmail()
    email: string | null;

    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "ProvWeb"
    })
    webSite: string | null;

    @Column("bit", {
        nullable: true,
        name: "ProvEstado"
    })
    isActive: boolean | null;

    @ManyToOne(type => Commune, comunas => comunas.proveedors, {})
    @JoinColumn({name: 'codigo'})
    comuna: Commune | null;

    @Column("nchar", {
        length: 10,
        name: "ProvAbreviacion",
        nullable: true
    })
    ProvAbreviacion: string | null;

    @OneToMany(type => facturas, facturas => facturas.provRut)
    facturass: facturas[];

}
