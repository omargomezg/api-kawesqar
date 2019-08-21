import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Invoice} from "./Invoice";

@Entity("tipoDocIn", {schema: "dbo"})
export class tipoDocIn extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idTipoDocIn",
        type: "int"
    })
    id: number;

    @Column("nvarchar", {
        length: 50,
        name: "descripcion",
        nullable: false
    })
    description: string;

    @Column("bit", {
        name: "estado",
        nullable: false
    })
    isActive: boolean;

    @OneToMany(
        (type: Invoice) => Invoice,
        (invoice: Invoice) => invoice.idTipoDocIn)
    invoices: Invoice[];

}
