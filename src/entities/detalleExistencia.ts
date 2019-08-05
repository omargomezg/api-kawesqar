import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {existencia} from "./existencia";
import {Products} from "./Products";
import {Store} from "./Store";


@Entity("detalleExistencia",{schema:"dbo" } )
export class detalleExistencia {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idDetalleExistencia"
        })
    idDetalleExistencia:number;
        

   
    @ManyToOne(type=>existencia, existencia=>existencia.detalleExistencias,{  nullable:false, })
    @JoinColumn({ name:'idExistencia'})
    idExistencia:existencia | null;


   
    @ManyToOne(type=>Products, articulos=>articulos.detalleExistencias,{  nullable:false, })
    @JoinColumn({ name: "article_id", referencedColumnName: "idArticulo"})
    idArticulo:Products | null;


    @Column("int",{ 
        nullable:false,
        name:"cantidad"
        })
    cantidad:number;
        

    @Column("money",{ 
        nullable:false,
        name:"valorUnitario"
        })
    valorUnitario:number;
        

    @Column("bit",{ 
        nullable:true,
        name:"esGranel"
        })
    esGranel:boolean | null;
        

   
    @ManyToOne(type=>Store, bodega=>bodega.detalleExistencias,{  })
    @JoinColumn({ name:'idbodega'})
    idbodega:Store | null;

}
