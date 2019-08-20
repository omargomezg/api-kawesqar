import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {chequePago} from "./chequePago";
import {FormsOfPayment} from "./FormsOfPayment";

@Entity("bancos", {schema: "dbo"})
export class Bank {

    @PrimaryGeneratedColumn({
        name: "idBanco",
        type: "int"
    })
    id: number;

    @Column("varchar", {
        length: 60,
        name: "descripcion",
        nullable: false
    })
    name: string;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

    @OneToMany((type: chequePago) => chequePago, (cheque: chequePago) => cheque.idBanco)
    cheques: chequePago[];

    @OneToMany(
        (type: FormsOfPayment) => FormsOfPayment,
        (formsOfPayment: FormsOfPayment) => formsOfPayment.bank
    )
    formsOfPayment: FormsOfPayment[];

}
