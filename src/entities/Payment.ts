import {IsNumber} from "class-validator";
import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PaymentMethodEnum} from "../models/enum/PaymentMethodEnum";
import {Bank} from "./Bank";
import {ProofOfPurchase} from "./ProofOfPurchase";

@Entity()
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNumber()
    documentNumber: number;

    @Column()
    nameOfPerson: string;

    @Column()
    personName: string;

    @Column({enum: PaymentMethodEnum})
    paymentMethod: PaymentMethodEnum;

    @ManyToOne(
        (type) => ProofOfPurchase,
        (proofOfPurchase: ProofOfPurchase) => proofOfPurchase)
    proofOfPurchase: ProofOfPurchase;

    @ManyToOne(
        (type) => Bank,
        (bank: Bank) => bank.payments
    )
    bank: Bank;
}
