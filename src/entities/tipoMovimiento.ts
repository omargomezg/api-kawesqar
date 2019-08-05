import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movimientos} from "./movimientos";


@Entity("tipoMovimiento",{schema:"dbo" } )
export class tipoMovimiento {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idTipoMovimiento"
        })
    idTipoMovimiento:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"descripcion"
        })
    descripcion:string;
        

   
    @OneToMany(type=>movimientos, movimientos=>movimientos.idTipoMovimiento)
    movimientoss:movimientos[];
    
}
