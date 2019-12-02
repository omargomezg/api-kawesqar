import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Parametros", {schema: "dbo"})
export class SystemParameters extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "PARA_Id",
        type: "int"
    })
    id: number;

    @Column("smallint", {
        name: "PARA_IdGrupo",
        nullable: false,
    })
    groupId: number;

    @Column("int", {
        name: "PARA_IdDetalle",
        nullable: false,
    })
    detailId: number;

    @Column("varchar", {
        name: "PARA_Descripcion",
        nullable: false
    })
    content: string;

}
