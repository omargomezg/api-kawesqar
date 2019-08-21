import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Branch} from "./Branch";
import {Cartola} from "./Cartola";
import {ChequePago} from "./ChequePago";
import {Client} from "./Client";
import {CostCenterChild} from "./CostCenterChild";
import {EliminaVenta} from "./eliminaVenta";
import {HistArticulos} from "./HistArticulos";
import {IngresoContado} from "./IngresoContado";
import {ProofOfPurchaseDetail} from "./ProofOfPurchaseDetail";
import {TipoPago} from "./tipoPago";
import {TurnoVenta} from "./TurnoVenta";

@Entity("comprobanteEgreso", {schema: "dbo"})
export class ProofOfPurchase extends BaseEntity {

    @PrimaryColumn("int", {
        name: "idFolio",
        nullable: false,
        primary: true
    })
    id: number;

    @Column("datetime", {
        name: "fecha",
        nullable: false
    })
    create: Date;

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

    @ManyToOne(
        (type: TipoPago) => TipoPago,
        (tipoPago: TipoPago) => tipoPago.proofOfPurchase)
    @JoinColumn({name: "idTipoPago"})
    tipoPago: TipoPago | null;

    @ManyToOne(
        (type: TurnoVenta) => TurnoVenta,
        (turnoVenta: TurnoVenta) => turnoVenta.proofOfPurchase)
    @JoinColumn({name: "idTurno"})
    turnoVenta: TurnoVenta | null;

    @ManyToOne(
        (type: Branch) => Branch,
        (branch: Branch) => branch.proofOfPurchase)
    @JoinColumn({name: "idSucursal"})
    branch: Branch | null;

    @ManyToOne(
        (type) => CostCenterChild,
            (costCenterChild: CostCenterChild) => costCenterChild.proofOfPurchase)
    @JoinColumn({name: "idSubGrupo"})
    idSubGrupo: CostCenterChild | null;

    @OneToMany(
        (type: Cartola) => Cartola,
            (cartola: Cartola) => cartola.proofOfPurchase)
    cartolas: Cartola[];

    @OneToMany(
        (type: ChequePago) => ChequePago,
        (chequePago: ChequePago) => chequePago.bank)
    cheques: ChequePago[];

    @OneToMany(
        (type: ProofOfPurchaseDetail) => ProofOfPurchaseDetail,
        (purchaseDetails: ProofOfPurchaseDetail) => purchaseDetails.proofOfPurchase)
    purchaseDetails: ProofOfPurchaseDetail[];

    @OneToMany(
        (type: EliminaVenta) => EliminaVenta,
        (eliminaVenta: EliminaVenta) => eliminaVenta.proofOfPurchase)
    eliminaVentass: EliminaVenta[];

    @OneToMany(
        (type) => HistArticulos,
            (histArticulos: HistArticulos) => histArticulos.proofOfPurchase)
    histArticuloss: HistArticulos[];

    @OneToMany(
        (type) => IngresoContado,
            (ingresoContado: IngresoContado) => ingresoContado.proofOfPurchase)
    ingresoContados: IngresoContado[];

}
