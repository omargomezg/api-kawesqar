import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Client} from "./Client";


@Entity("tipoCliente",{schema:"dbo" } )
export class tipoCliente {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idTcliente"
        })
    idTcliente:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"descripcion"
        })
    descripcion:string;
        

    @Column("bit",{ 
        nullable:true,
        name:"estado"
        })
    estado:boolean | null;
        

   
    @OneToMany(type=>Client, clientes=>clientes.typeOfClient)
    clientess:Client[];
    
}
