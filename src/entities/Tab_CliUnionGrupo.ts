import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {CostCenter} from "./CostCenter";


@Entity("Tab_CliUnionGrupo",{schema:"dbo" } )
export class Tab_CliUnionGrupo {

    @Column("nvarchar",{ 
        nullable:false,
        length:13,
        name:"Rut_cli"
        })
    Rut_cli:string;
        

   
    @ManyToOne(type=>CostCenter, grupo=>grupo.tabCliUnionGrupos,{  nullable:false, })
    @JoinColumn({ name:'IdGrupo'})
    idGrupo:CostCenter | null;


    @PrimaryGeneratedColumn({
        type:"numeric",
        name:"id"
        })
    id:number;
        
}
