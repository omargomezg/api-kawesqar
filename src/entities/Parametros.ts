import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Parametros", {schema: "dbo"})
export class Parametros {

    @PrimaryGeneratedColumn({
        name: "PARA_Id",
        type: "int"
    })
    PARA_Id: number;

    @Column("smallint", {
        nullable: false,
        name: "PARA_IdGrupo"
    })
    PARA_IdGrupo: number;

    @Column("int", {
        nullable: false,
        name: "PARA_IdDetalle"
    })
    PARA_IdDetalle: number;

    @Column("varchar", {
        nullable: false,
        name: "PARA_Descripcion"
    })
    PARA_Descripcion: string;

}
