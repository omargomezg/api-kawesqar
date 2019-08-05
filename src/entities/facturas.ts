import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Proveedor} from "./Proveedor";
import {SystemUser} from "./SystemUser";
import {tipoDocIn} from "./tipoDocIn";
import {Branch} from "./Branch";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {detalleFactura} from "./detalleFactura";
import {HistArticulos} from "./HistArticulos";
import {TempArt} from "./TempArt";


@Entity("facturas",{schema:"dbo" } )
export class facturas {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"idFact"
        })
    idFact:number;
        

    @Column("char",{ 
        nullable:false,
        length:10,
        name:"NFactura"
        })
    NFactura:string;
        

   
    @ManyToOne(type=>Proveedor, proveedor=>proveedor.facturass,{  nullable:false, })
    @JoinColumn({ name:'ProvRut'})
    provRut:Proveedor | null;


    @Column("datetime",{ 
        nullable:false,
        name:"Fecha"
        })
    Fecha:Date;
        

    @Column("datetime",{ 
        nullable:true,
        name:"fechaIngreso"
        })
    fechaIngreso:Date | null;
        

   
    @ManyToOne(type=>SystemUser, cs_usuarios=>cs_usuarios.facturass,{  })
    @JoinColumn({ name:'rutUsuario'})
    rutUsuario:SystemUser | null;


    @Column("varchar",{ 
        nullable:true,
        length:50,
        default: () => "'EP'",
        name:"estadoUso"
        })
    estadoUso:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"valImpuesto"
        })
    valImpuesto:number | null;
        

   
    @ManyToOne(type=>tipoDocIn, tipoDocIn=>tipoDocIn.facturass,{  nullable:false, })
    @JoinColumn({ name:'idTipoDocIn'})
    idTipoDocIn:tipoDocIn | null;


    @Column("varchar",{ 
        nullable:true,
        name:"notas"
        })
    notas:string | null;
        

   
    @ManyToOne(type=>Branch, cs_sucursales=>cs_sucursales.facturass,{  })
    @JoinColumn({ name:'Sucursal'})
    sucursal:Branch | null;


   
    @OneToMany(type=>DesgloseArticulo, desgloseArticulo=>desgloseArticulo.idFact)
    desgloseArticulos:DesgloseArticulo[];
    

   
    @OneToMany(type=>detalleFactura, detalleFactura=>detalleFactura.idFact)
    detalleFacturas:detalleFactura[];
    

   
    @OneToMany(type=>HistArticulos, histArticulos=>histArticulos.idFact)
    histArticuloss:HistArticulos[];
    

   
    @OneToMany(type=>TempArt, tempArt=>tempArt.idFact)
    tempArts:TempArt[];
    
}
