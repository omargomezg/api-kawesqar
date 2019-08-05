import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("BaseFirmas",{schema:"dbo" } )
export class BaseFirmas {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"IdBaseFirma"
        })
    IdBaseFirma:number;
        

    @Column("text",{ 
        nullable:false,
        name:"Campo1"
        })
    Campo1:string;
        

    @Column("bit",{ 
        nullable:true,
        default: () => "(1)",
        name:"estado"
        })
    estado:boolean | null;
        
}
