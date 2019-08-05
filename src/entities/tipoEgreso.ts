import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {tipoEgreso_Usuario} from "./tipoEgreso_Usuario";


@Entity("tipoEgreso",{schema:"dbo" } )
export class tipoEgreso {

    @PrimaryGeneratedColumn({
        type:"tinyint", 
        name:"idtVenta"
        })
    idtVenta:number;
        

    @Column("nchar",{ 
        nullable:false,
        length:40,
        name:"descripcion"
        })
    descripcion:string;
        

    @Column("nchar",{ 
        nullable:false,
        length:3,
        name:"codigo"
        })
    codigo:string;
        

   
    @OneToMany(type=>tipoEgreso_Usuario, tipoEgreso_Usuario=>tipoEgreso_Usuario.idtVenta)
    tipoEgresoUsuarios:tipoEgreso_Usuario[];
    
}
