import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Branch} from "./Branch";
import {cartola} from "./cartola";
import {chequePago} from "./chequePago";
import {Client} from "./Client";
import {CostCenterChild} from "./CostCenterChild";
import {eliminaVenta} from "./eliminaVenta";
import {HistArticulos} from "./HistArticulos";
import {ingresoContado} from "./ingresoContado";
import {ProofOfPurchaseDetail} from "./ProofOfPurchaseDetail";
import {tipoPago} from "./tipoPago";
import {turnoVenta} from "./turnoVenta";

@Entity("comprobanteEgreso", {schema: "dbo"})
export class ProofOfPurchase extends BaseEntity {

    @Column("int", {
        name: "idFolio",
        nullable: false,
        primary: true
    })
    folio: number;

    @Column("datetime", {
        name: "fecha",
        nullable: false
    })
    fecha: Date;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

    @Column("bit", {
        default: () => "(0)",
        name: "usoCredito",
        nullable: true
    })
    usoCredito: boolean | null;

    @Column("bit", {
        default: () => "(0)",
        name: "estadoCredito",
        nullable: true
    })
    estadoCredito: boolean | null;

    @Column("nvarchar", {
        length: 3,
        name: "tipoVenta",
        nullable: true
    })
    tipoVenta: string | null;

    @Column("numeric", {
        name: "nDocumento",
        nullable: true,
        scale: 0
    })
    nDocumento: number | null;

    @Column("int", {
        default: () => "(0)",
        name: "descuento",
        nullable: true,
    })
    descuento: number | null;

    @Column("nvarchar", {
        name: "notas",
        nullable: true,
    })
    notas: string | null;

    @Column("varchar", {
        length: 12,
        name: "rutUsuario",
        nullable: true
    })
    rutUsuario: string | null;

    @Column("int", {
        name: "idIngresoContado",
        nullable: true,
    })
    idIngresoContado: number | null;

    @Column("tinyint", {
        name: "idtVenta",
        nullable: true,
    })
    idtVenta: number | null;

    @ManyToOne(
        (type: Client) => Client,
        (client: Client) => client.proofOfPurchase)
    @JoinColumn({name: "rut_cli"})
    client: Client | null;

    @ManyToOne(type => tipoPago, tipoPago => tipoPago.proofOfPurchase)
    @JoinColumn({name: "idTipoPago"})
    idTipoPago: tipoPago | null;

    @ManyToOne(type => turnoVenta, turnoVenta => turnoVenta.proofOfPurchase)
    @JoinColumn({name: "idTurno"})
    idTurno: turnoVenta | null;

    @ManyToOne(
        (type: Branch) => Branch,
        (branch: Branch) => branch.comprobanteEgresos)
    @JoinColumn({name: "idSucursal"})
    branch: Branch | null;

    @ManyToOne(type => CostCenterChild, subGrupo => subGrupo.proofOfPurchase)
    @JoinColumn({name: "idSubGrupo"})
    idSubGrupo: CostCenterChild | null;

    @OneToMany(type => cartola, cartola => cartola.idFolio)
    cartolas: cartola[];

    @OneToMany(type => chequePago, chequePago => chequePago.idFolio)
    chequePagos: chequePago[];

    @OneToMany(
        (type: ProofOfPurchaseDetail) => ProofOfPurchaseDetail,
        (purchaseDetails: ProofOfPurchaseDetail) => purchaseDetails.proofOfPurchase)
    purchaseDetails: ProofOfPurchaseDetail[];

    @OneToMany(type => eliminaVenta, eliminaVenta => eliminaVenta.idFolio)
    eliminaVentas: eliminaVenta[];

    @OneToMany(type => HistArticulos, histArticulos => histArticulos.proofOfPurchase)
    histArticuloss: HistArticulos[];

    @OneToMany(type => ingresoContado, ingresoContado => ingresoContado.proofOfPurchase)
    ingresoContados: ingresoContado[];

}
