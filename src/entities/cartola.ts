import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "./Client";
import {ProofOfPurchase} from "./ProofOfPurchase";
import {movimientos} from "./movimientos";

@Entity("cartola", {schema: "dbo"})
export class cartola {

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

    @ManyToOne(type => movimientos, movimientos => movimientos.cartolas, {nullable: false,})
    @JoinColumn({name: "idMovimiento"})
    idMovimiento: movimientos | null;

    @ManyToOne(
        (type: Client) => Client,
            (client: Client) => client.cartolas, {nullable: false})
    @JoinColumn({name: "rutCliente"})
    client: Client | null;

    @ManyToOne(
        (type: ProofOfPurchase) => ProofOfPurchase,
            (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.cartolas)
    @JoinColumn({name: "idFolio"})
    idFolio: ProofOfPurchase | null;

}
