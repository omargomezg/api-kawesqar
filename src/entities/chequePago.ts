import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bank} from "./Bank";
import {comprobanteEgreso} from "./comprobanteEgreso";

@Entity("chequePago", {schema: "dbo"})
export class chequePago {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "idChequePago"
    })
    idChequePago: number;

    @Column("numeric", {
        name: "numero",
        nullable: false,
        scale: 0,
    })
    numero: number;

    @ManyToOne((type: Bank) => Bank, bancos => bancos.chequePagos, {nullable: false,})
    @JoinColumn({name: "idBanco"})
    idBanco: Bank | null;

    @Column("numeric", {
        name: "monto",
        nullable: false,
        scale: 0
    })
    monto: number;

    @Column("nchar", {
        nullable: true,
        length: 10,
        name: "telefono"
    })
    telefono: string | null;

    @Column("nvarchar", {
        nullable: true,
        length: 50,
        name: "nombrePersona"
    })
    nombrePersona: string | null;

    @ManyToOne(type => comprobanteEgreso, comprobanteEgreso => comprobanteEgreso.chequePagos, {nullable: false,})
    @JoinColumn({name: 'IdFolio'})
    idFolio: comprobanteEgreso | null;

    @Column("bit", {
        nullable: true,
        default: () => "(1)",
        name: "estado"
    })
    estado: boolean | null;

}
