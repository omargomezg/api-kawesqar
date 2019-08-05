import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {detalleExistencia} from "./detalleExistencia";


@Entity("existencia",{schema:"dbo" } )
export class existencia {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idExistencia"
        })
    idExistencia:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"fecha"
        })
    fecha:Date;
        

    @Column("varchar",{ 
        nullable:false,
        length:12,
        name:"rutUsuario"
        })
    rutUsuario:string;
        

    @Column("int",{ 
        nullable:false,
        name:"idSucursal"
        })
    idSucursal:number;
        

    @Column("bit",{ 
        nullable:false,
        default: () => "(1)",
        name:"estado"
        })
    estado:boolean;
        

   
    @OneToMany(type=>detalleExistencia, detalleExistencia=>detalleExistencia.idExistencia)
    detalleExistencias:detalleExistencia[];
    
}
