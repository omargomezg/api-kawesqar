import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("Errores",{schema:"dbo" } )
export class Errores {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"IdError"
        })
    IdError:number;
        

    @Column("text",{ 
        nullable:true,
        name:"mensaje"
        })
    mensaje:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"pagina"
        })
    pagina:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"fecha"
        })
    fecha:Date | null;
        
}
