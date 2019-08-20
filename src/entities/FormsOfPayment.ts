import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bank} from "../entities/Bank";

@Entity({schema: "dbo"})
export class FormsOfPayment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    number: number;
    @Column()
    paymentDate: Date;

    @ManyToOne(
        (type: Bank) => Bank,
        (bank: Bank) => bank.formsOfPayment
    )
    bank: Bank;
}
