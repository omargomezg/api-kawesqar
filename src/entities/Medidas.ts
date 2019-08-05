import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Products} from "./Products";


@Entity("Medidas",{schema:"dbo" } )
export class Medidas {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"IdMedida"
        })
    IdMedida:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"NomMedida"
        })
    NomMedida:string;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:50,
        name:"nomPlural"
        })
    nomPlural:string | null;
        

    @Column("datetime",{ 
        nullable:false,
        default: () => "getdate()",
        name:"lastupdate"
        })
    lastupdate:Date;
        

   
    @OneToMany(type=>Products, articulos=>articulos.idMedida)
    articuloss:Products[];
    

   
    @OneToMany(type=>Products, articulos=>articulos.idMedidaGranel)
    articuloss2:Products[];
    
}
