import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("msjeSistema",{schema:"dbo" } )
export class msjeSistema {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idMensaje"
        })
    idMensaje:number;
        

    @Column("text",{ 
        nullable:false,
        default: () => "'sin especificar'",
        name:"textMensaje"
        })
    textMensaje:string;
        
}
