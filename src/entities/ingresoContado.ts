import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {comprobanteEgreso} from "./comprobanteEgreso";


@Entity("ingresoContado",{schema:"dbo" } )
export class ingresoContado {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idIngresoContado"
        })
    idIngresoContado:number;
        

   
    @ManyToOne(type=>comprobanteEgreso, comprobanteEgreso=>comprobanteEgreso.ingresoContados,{  nullable:false, })
    @JoinColumn({ name:'idFolio'})
    idFolio:comprobanteEgreso | null;


    @Column("nvarchar",{ 
        nullable:false,
        length:50,
        name:"nombreComprador"
        })
    nombreComprador:string;
        

    @Column("numeric",{ 
        nullable:false,
        scale:0,
        name:"numCorrelativo"
        })
    numCorrelativo:number;
        

    @Column("int",{ 
        nullable:false,
        name:"idSucursal"
        })
    idSucursal:number;
        
}
