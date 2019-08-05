import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {cartola} from "./cartola";
import {comprobanteEgreso} from "./comprobanteEgreso";
import {Commune} from "./Commune";
import {tipoCliente} from "./tipoCliente";

@Entity("clientes", {schema: "dbo"})
export class Client {

    @Column("nvarchar", {
        length: 13,
        name: "rutCliente",
        nullable: false,
        primary: true,
    })
    rut: string;

    @Column("varchar", {
        length: 50,
        name: "Nombres_cli",
        nullable: false
    })
    firstName: string;

    @Column("nvarchar", {
        length: 50,
        name: "ApPaterno_cli",
        nullable: false
    })
    lastName: string;

    @Column("nvarchar", {
        length: 50,
        name: "ApMaterno_cli",
        nullable: true
    })
    secondLastName: string | null;

    @Column("varchar", {
        length: 15,
        name: "Fono",
        nullable: true,
    })
    telephone: string | null;

    @Column("varchar", {
        length: 15,
        name: "Fax",
        nullable: true,
    })
    Fax: string | null;

    @Column("varchar", {
        length: 15,
        name: "Celular",
        nullable: true,
    })
    mobile: string | null;

    @Column("varchar", {
        length: 500,
        name: "Direccion",
        nullable: true,
    })
    address: string | null;

    @Column("varchar", {
        length: 120,
        name: "Email",
        nullable: true,
    })
    Email: string | null;

    @Column("datetime", {
        name: "Fingreso",
        nullable: false
    })
    created: Date;

    @Column("numeric", {
        default: () => "(0)",
        name: "MaxCredito",
        nullable: true,
        scale: 0
    })
    MaxCredito: number | null;

    @Column("bit", {
        default: () => "(0)",
        name: "permiteVentaCredito",
        nullable: true,
    })
    permiteVentaCredito: boolean | null;

    @Column("bit", {
        default: () => "(1)",
        name: "permiteVentaFactura",
        nullable: true
    })
    permiteVentaFactura: boolean | null;

    @Column("nvarchar", {
        length: 150,
        name: "nombreFantasia",
        nullable: true,
    })
    fantasyName: string | null;

    @ManyToOne(type => Commune, comunas => comunas.clientess, {})
    @JoinColumn({name: 'codigo'})
    codigo: Commune | null;

    @Column("nvarchar", {
        name: "giro",
        nullable: true
    })
    giro: string | null;

    @ManyToOne(type => tipoCliente, tipoCliente => tipoCliente.clientess, {})
    @JoinColumn({name: 'idTcliente'})
    typeOfClient: tipoCliente | null;

    @OneToMany(type => cartola, cartola => cartola.rutCliente)
    cartolas: cartola[];

    @OneToMany(type => comprobanteEgreso, comprobanteEgreso => comprobanteEgreso.rutCli)
    comprobanteEgresos: comprobanteEgreso[];

}
