import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {movimientos} from "./movimientos";
import {Client} from "./Client";
import {comprobanteEgreso} from "./comprobanteEgreso";


@Entity("cartola",{schema:"dbo" } )
export class cartola {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idCartola"
        })
    idCartola:number;
        

   
    @ManyToOne(type=>movimientos, movimientos=>movimientos.cartolas,{  nullable:false, })
    @JoinColumn({ name:'idMovimiento'})
    idMovimiento:movimientos | null;


    @Column("money",{ 
        nullable:false,
        name:"valor"
        })
    valor:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"fecha"
        })
    fecha:Date;
        

    @Column("money",{ 
        nullable:false,
        name:"saldo"
        })
    saldo:number;
        

   
    @ManyToOne(type=>Client, clientes=>clientes.cartolas,{  nullable:false, })
    @JoinColumn({ name:'rutCliente'})
    rutCliente:Client | null;


   
    @ManyToOne(type=>comprobanteEgreso, comprobanteEgreso=>comprobanteEgreso.cartolas,{  })
    @JoinColumn({ name:'idFolio'})
    idFolio:comprobanteEgreso | null;

}
