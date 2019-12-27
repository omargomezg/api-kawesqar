import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RelationSystemUserOutputType} from "./RelationSystemUserOutputType";
import {SaleTypeEnum} from "../models/enum/type-sale.enum";

@Entity("tipoEgreso", {schema: "dbo"})
export class OutputType extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idtVenta",
        type: "tinyint",
    })
    id: number;

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
    code: string;

    @Column()
    codeEnum: SaleTypeEnum;

    @Column("nvarchar", {
        length: 10
    })
    abbreviation: string;

    @OneToMany(
        (type: RelationSystemUserOutputType) => RelationSystemUserOutputType,
        (userOutputType: RelationSystemUserOutputType) => userOutputType.outputType)
    userOutputTypes: RelationSystemUserOutputType[];

    public BasicList() {
        const list: OutputType[] = [];
        const first = new OutputType();
        first.name = "Venta Contado";
        list.push(first);
        return list;
    }

}
