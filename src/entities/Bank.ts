import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {chequePago} from "./chequePago";

@Entity("bancos", {schema: "dbo"})
export class Bank {

    @PrimaryGeneratedColumn({
        name: "idBanco",
        type: "int"
    })
    idBanco: number;

    @Column("varchar", {
        length: 60,
        name: "descripcion",
        nullable: false
    })
    descripcion: string;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    estado: boolean | null;

    @OneToMany((type: any) => chequePago, (chequePago: chequePago) => chequePago.idBanco)
    chequePagos: chequePago[];

}
