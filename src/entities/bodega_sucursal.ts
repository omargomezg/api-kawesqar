import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Store} from "./Store";
import {Branch} from "./Branch";


@Entity("bodega_sucursal",{schema:"dbo" } )
export class bodega_sucursal {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idBodegaSucursal"
        })
    idBodegaSucursal:number;
        

   
    @ManyToOne(type=>Store, bodega=>bodega.bodegaSucursals,{  nullable:false, })
    @JoinColumn({ name:'idBodega'})
    idBodega:Store | null;


   
    @ManyToOne(type=>Branch, cs_sucursales=>cs_sucursales.bodegaSucursals,{  nullable:false, })
    @JoinColumn({ name:'idSucursal'})
    idSucursal:Branch | null;


    @Column("bit",{ 
        nullable:false,
        name:"estado"
        })
    estado:boolean;
        
}
