import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {cartola} from "./cartola";
import {Commune} from "./Commune";
import {comprobanteEgreso} from "./comprobanteEgreso";
import {Person} from "./Person";
import {ClientType} from "./ClientType";

@Entity("clientes", {schema: "dbo"})
export class Client extends Person {

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

    @ManyToOne(
        (type: Commune) => Commune,
        (isCommune: Commune) => isCommune.clientess, {})
    @JoinColumn({name: "codigo"})
    commune: Commune | null;

    @Column("nvarchar", {
        name: "giro",
        nullable: true
    })
    giro: string | null;

    @ManyToOne(
        (type: ClientType) => ClientType,
            (clientType: ClientType) => clientType.clients, {})
    @JoinColumn({name: "idTcliente"})
    typeOfClient: ClientType | null;

    @OneToMany(type => cartola, cartola => cartola.rutCliente)
    cartolas: cartola[];

    @OneToMany(type => comprobanteEgreso, comprobanteEgreso => comprobanteEgreso.rutCli)
    comprobanteEgresos: comprobanteEgreso[];

}
