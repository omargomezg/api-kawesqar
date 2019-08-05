import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Branch} from "./Branch";
import {familia} from "./familia";


@Entity("sucursalAsociada",{schema:"dbo" } )
export class sucursalAsociada {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>Branch, cs_sucursales=>cs_sucursales.sucursalAsociadas,{  })
    @JoinColumn({ name:'idSucursal'})
    idSucursal:Branch | null;


   
    @ManyToOne(type=>familia, familia=>familia.sucursalAsociadas,{  })
    @JoinColumn({ name:'idFamilia'})
    idFamilia:familia | null;


    @Column("bit",{ 
        nullable:true,
        default: () => "(0)",
        name:"estado"
        })
    estado:boolean | null;
        
}
