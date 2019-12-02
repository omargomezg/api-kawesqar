import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DetalleExistencia} from "./DetalleExistencia";

@Entity("existencia", {schema: "dbo"})
export class Existencia extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idExistencia",
        type: "int"
    })
    id: number;

    @Column("datetime", {
        name: "fecha",
        nullable: false
    })
    fecha: Date;

    @Column("varchar", {
        length: 12,
        name: "rutUsuario",
        nullable: false
    })
    rutUsuario: string;

    @Column("int", {
        name: "idSucursal",
        nullable: false
    })
    idSucursal: number;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: false
    })
    estado: boolean;

    @OneToMany(
        (type: DetalleExistencia) => DetalleExistencia,
        (detalleExistencia: DetalleExistencia) => detalleExistencia.existencia)
    detalleExistencias: DetalleExistencia[];

}
