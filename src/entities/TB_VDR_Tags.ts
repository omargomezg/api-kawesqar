import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("TB_VDR_Tags",{schema:"dbo" } )
export class TB_VDR_Tags {

    @PrimaryGeneratedColumn({
        type:"tinyint", 
        name:"TAGS_Id"
        })
    TAGS_Id:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:150,
        name:"TAGS_Descripcion"
        })
    TAGS_Descripcion:string;
        

    @Column("bit",{ 
        nullable:true,
        default: () => "(1)",
        name:"TAGS_Estado"
        })
    TAGS_Estado:boolean | null;
        
}
