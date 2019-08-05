import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Branch} from "./Branch";
import {SystemUser} from "./SystemUser";


@Entity("cs_relacion_usuarioSucursal",{schema:"dbo" } )
export class cs_relacion_usuarioSucursal {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idRelacion"
        })
    idRelacion:number;
        

   
    @ManyToOne(type=>Branch, cs_sucursales=>cs_sucursales.csRelacionUsuarioSucursals,{  nullable:false, })
    @JoinColumn({ name:'idSucursal'})
    idSucursal:Branch | null;


   
    @ManyToOne(type=>SystemUser, cs_usuarios=>cs_usuarios.csRelacionUsuarioSucursals,{  nullable:false, })
    @JoinColumn({ name:'rutUsuario'})
    rutUsuario:SystemUser | null;


    @Column("bit",{ 
        nullable:false,
        default: () => "(1)",
        name:"estado"
        })
    estado:boolean;
        
}
