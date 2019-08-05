import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Client} from "./Client";
import {tipoPago} from "./tipoPago";
import {turnoVenta} from "./turnoVenta";
import {Branch} from "./Branch";
import {CostCenterChild} from "./CostCenterChild";
import {cartola} from "./cartola";
import {chequePago} from "./chequePago";
import {detalleVenta} from "./detalleVenta";
import {eliminaVenta} from "./eliminaVenta";
import {HistArticulos} from "./HistArticulos";
import {ingresoContado} from "./ingresoContado";


@Entity("comprobanteEgreso",{schema:"dbo" } )
export class comprobanteEgreso {

    @Column("int",{ 
        nullable:false,
        primary:true,
        name:"idFolio"
        })
    idFolio:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"fecha"
        })
    fecha:Date;
        

   
    @ManyToOne(type=>Client, clientes=>clientes.comprobanteEgresos,{  })
    @JoinColumn({ name:'rut_cli'})
    rutCli:Client | null;


   
    @ManyToOne(type=>tipoPago, tipoPago=>tipoPago.comprobanteEgresos,{  })
    @JoinColumn({ name:'idTipoPago'})
    idTipoPago:tipoPago | null;


    @Column("bit",{ 
        nullable:true,
        default: () => "(1)",
        name:"estado"
        })
    estado:boolean | null;
        

    @Column("bit",{ 
        nullable:true,
        default: () => "(0)",
        name:"usoCredito"
        })
    usoCredito:boolean | null;
        

    @Column("bit",{ 
        nullable:true,
        default: () => "(0)",
        name:"estadoCredito"
        })
    estadoCredito:boolean | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        length:3,
        name:"tipoVenta"
        })
    tipoVenta:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        scale:0,
        name:"nDocumento"
        })
    nDocumento:number | null;
        

   
    @ManyToOne(type=>turnoVenta, turnoVenta=>turnoVenta.comprobanteEgresos,{  })
    @JoinColumn({ name:'idTurno'})
    idTurno:turnoVenta | null;


    @Column("int",{ 
        nullable:true,
        default: () => "(0)",
        name:"descuento"
        })
    descuento:number | null;
        

    @Column("nvarchar",{ 
        nullable:true,
        name:"notas"
        })
    notas:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:12,
        name:"rutUsuario"
        })
    rutUsuario:string | null;
        

   
    @ManyToOne(type=>Branch, cs_sucursales=>cs_sucursales.comprobanteEgresos,{  })
    @JoinColumn({ name:'idSucursal'})
    idSucursal:Branch | null;


   
    @ManyToOne(type=>CostCenterChild, subGrupo=>subGrupo.comprobanteEgresos,{  })
    @JoinColumn({ name:'idSubGrupo'})
    idSubGrupo:CostCenterChild | null;


    @Column("int",{ 
        nullable:true,
        name:"idIngresoContado"
        })
    idIngresoContado:number | null;
        

    @Column("tinyint",{ 
        nullable:true,
        name:"idtVenta"
        })
    idtVenta:number | null;
        

   
    @OneToMany(type=>cartola, cartola=>cartola.idFolio)
    cartolas:cartola[];
    

   
    @OneToMany(type=>chequePago, chequePago=>chequePago.idFolio)
    chequePagos:chequePago[];
    

   
    @OneToMany(type=>detalleVenta, detalleVenta=>detalleVenta.idFolio)
    detalleVentas:detalleVenta[];
    

   
    @OneToMany(type=>eliminaVenta, eliminaVenta=>eliminaVenta.idFolio)
    eliminaVentas:eliminaVenta[];
    

   
    @OneToMany(type=>HistArticulos, histArticulos=>histArticulos.idFolio)
    histArticuloss:HistArticulos[];
    

   
    @OneToMany(type=>ingresoContado, ingresoContado=>ingresoContado.idFolio)
    ingresoContados:ingresoContado[];
    
}
