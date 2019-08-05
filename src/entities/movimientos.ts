import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {tipoMovimiento} from "./tipoMovimiento";
import {cartola} from "./cartola";


@Entity("movimientos",{schema:"dbo" } )
export class movimientos {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idMovimiento"
        })
    idMovimiento:number;
        

    @Column("nvarchar",{ 
        nullable:false,
        name:"descripcion"
        })
    descripcion:string;
        

   
    @ManyToOne(type=>tipoMovimiento, tipoMovimiento=>tipoMovimiento.movimientoss,{  nullable:false, })
    @JoinColumn({ name:'idTipoMovimiento'})
    idTipoMovimiento:tipoMovimiento | null;


   
    @OneToMany(type=>cartola, cartola=>cartola.idMovimiento)
    cartolas:cartola[];
    
}
