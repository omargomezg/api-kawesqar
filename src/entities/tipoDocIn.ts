import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {facturas} from "./facturas";


@Entity("tipoDocIn",{schema:"dbo" } )
export class tipoDocIn {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idTipoDocIn"
        })
    idTipoDocIn:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"descripcion"
        })
    descripcion:string;
        

    @Column("bit",{ 
        nullable:false,
        name:"estado"
        })
    estado:boolean;
        

   
    @OneToMany(type=>facturas, facturas=>facturas.idTipoDocIn)
    facturass:facturas[];
    
}
