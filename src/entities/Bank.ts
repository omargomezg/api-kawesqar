import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ChequePago} from "./ChequePago";
import {FormsOfPayment} from "./FormsOfPayment";

@Entity("bancos", {schema: "dbo"})
export class Bank extends BaseEntity {

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

    @OneToMany(
        (type: ChequePago) => ChequePago,
        (chequePago: ChequePago) => chequePago.bank)
    cheques: ChequePago[];

    @OneToMany(
        (type: FormsOfPayment) => FormsOfPayment,
        (formsOfPayment: FormsOfPayment) => formsOfPayment.bank
    )
    formsOfPayment: FormsOfPayment[];

}
