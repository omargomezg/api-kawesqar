import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "./Client";
import {Movimientos} from "./Movimientos";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity("cartola", {schema: "dbo"})
export class Cartola extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idCartola",
        type: "int",
    })
    id: number;

    @Column("money", {
        name: "valor",
        nullable: false,
    })
    valor: number;

    @Column("datetime", {
        name: "fecha",
        nullable: false,
    })
    fecha: Date;

    @Column("money", {
        name: "saldo",
        nullable: false,
    })
    saldo: number;

    @ManyToOne((type: Movimientos) => Movimientos,
        (movimientos: Movimientos) => movimientos.cartolas,
        {nullable: false})
    @JoinColumn({name: "idMovimiento"})
    idMovimiento: Movimientos | null;

    @ManyToOne(
        (type: Client) => Client,
        (client: Client) => client.cartolas, {nullable: false})
    @JoinColumn({name: "rutCliente"})
    client: Client | null;

    @ManyToOne(
        (type: ProofOfPurchase) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.cartolas)
    @JoinColumn({name: "idFolio"})
    proofOfPurchase: ProofOfPurchase | null;

}
