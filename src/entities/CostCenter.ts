import {Length} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CostCenterChild} from "./CostCenterChild";
import {Tab_CliUnionGrupo} from "./Tab_CliUnionGrupo";

@Entity("Grupo", {schema: "dbo"})
export class CostCenter {

    @PrimaryGeneratedColumn({
        name: "idGrupo",
        type: "int"
    })
    id: number;

    @Column("nvarchar", {
        length: 50,
        name: "nomGrupo",
        nullable: false
    })
    @Length(0, 50)
    name: string;

    @Column("bit", {
        default: () => "(0)",
        name: "estado",
        nullable: false,
    })
    isActive: boolean;

    @OneToMany(type => CostCenterChild, subGrupo => subGrupo.father)
    subGrupos: CostCenterChild[];

    @OneToMany(type => Tab_CliUnionGrupo, tab_CliUnionGrupo => tab_CliUnionGrupo.idGrupo)
    tabCliUnionGrupos: Tab_CliUnionGrupo[];

}
