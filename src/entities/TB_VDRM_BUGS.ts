import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("TB_VDRM_BUGS",{schema:"dbo" } )
export class TB_VDRM_BUGS {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"BUGS_ID"
        })
    BUGS_ID:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"BUGS_FECHA"
        })
    BUGS_FECHA:Date;
        

    @Column("text",{ 
        nullable:false,
        name:"BUGS_DETALLE"
        })
    BUGS_DETALLE:string;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"BUGS_ORIGEN"
        })
    BUGS_ORIGEN:string | null;
        
}
