import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RelationSystemUserOutputType} from "./RelationSystemUserOutputType";

@Entity("tipoEgreso", {schema: "dbo"})
export class OutputType extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idtVenta",
        type: "tinyint",
    })
    idtVenta: number;

    @Column("nchar", {
        length: 40,
        name: "descripcion",
        nullable: false,
    })
    name: string;

    @Column("nchar", {
        length: 3,
        name: "codigo",
        nullable: false,
    })
    codigo: string;

    @OneToMany(type => RelationSystemUserOutputType, tipoEgreso_Usuario => tipoEgreso_Usuario.idtVenta)
    tipoEgresoUsuarios: RelationSystemUserOutputType[];

    public BasicList() {
        const list: OutputType[] = [];
        const first = new OutputType();
        first.name = "Venta Contado";
        list.push(first)
        return list;
    }

}
