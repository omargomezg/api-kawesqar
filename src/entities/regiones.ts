import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {provincias} from "./provincias";


@Entity("regiones",{schema:"dbo" } )
export class regiones {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"codigo"
        })
    codigo:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:60,
        default: () => "NULL",
        name:"nombre"
        })
    nombre:string | null;
        

    @Column("nchar",{ 
        nullable:false,
        length:4,
        default: () => "'0'",
        name:"idRomano"
        })
    idRomano:string;
        

    @Column("bit",{ 
        nullable:false,
        default: () => "(1)",
        name:"activo"
        })
    activo:boolean;
        

   
    @OneToMany(type=>provincias, provincias=>provincias.padre)
    provinciass:provincias[];
    
}
