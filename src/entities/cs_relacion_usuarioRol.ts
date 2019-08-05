import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SystemUser} from "./SystemUser";
import {role} from "./Role";


@Entity("cs_relacion_usuarioRol",{schema:"dbo" } )
export class cs_relacion_usuarioRol {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idRelacion"
        })
    idRelacion:number;
        

   
    @ManyToOne(type=>SystemUser, cs_usuarios=>cs_usuarios.csRelacionUsuarioRols,{  nullable:false, })
    @JoinColumn({ name:'rutUsuario'})
    rutUsuario:SystemUser | null;


   
    @ManyToOne(type=>role, cs_rol=>cs_rol.csRelacionUsuarioRols,{  nullable:false, })
    @JoinColumn({ name:'idRol'})
    idRol:role | null;


    @Column("bit",{ 
        nullable:true,
        default: () => "(1)",
        name:"estado"
        })
    estado:boolean | null;
        
}
