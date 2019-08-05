import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {comprobanteEgreso} from "./comprobanteEgreso";


@Entity("tipoPago",{schema:"dbo" } )
export class tipoPago {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idTipoPago"
        })
    idTipoPago:number;
        

    @Column("nchar",{ 
        nullable:false,
        length:20,
        default: () => "N'Descripción del tipo de venta, por ejemplo cheque, contado, documento, etc...'''",
        name:"descripcion"
        })
    descripcion:string;
        

    @Column("bit",{ 
        nullable:false,
        default: () => "(0)",
        name:"usoBoleta"
        })
    usoBoleta:boolean;
        

    @Column("bit",{ 
        nullable:false,
        default: () => "(0)",
        name:"usoFactura"
        })
    usoFactura:boolean;
        

   
    @OneToMany(type=>comprobanteEgreso, comprobanteEgreso=>comprobanteEgreso.idTipoPago)
    comprobanteEgresos:comprobanteEgreso[];
    
}
