import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {regiones} from "./regiones";
import {Commune} from "./Commune";


@Entity("provincias",{schema:"dbo" } )
export class provincias {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"codigo"
        })
    codigo:number;
        

   
    @ManyToOne(type=>regiones, regiones=>regiones.provinciass,{  nullable:false, })
    @JoinColumn({ name:'padre'})
    padre:regiones | null;


    @Column("varchar",{ 
        nullable:false,
        default: () => "NULL",
        name:"nombre"
        })
    nombre:string;
        

    @Column("tinyint",{ 
        nullable:false,
        default: () => "'1'",
        name:"activo"
        })
    activo:number;
        

   
    @OneToMany(type=>Commune, comunas=>comunas.padre)
    comunass:Commune[];
    
}
