import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {CartolaProducto} from "./CartolaProducto";

@Entity("movimientoArticulo",{schema:"dbo" } )
export class movimientoArticulo {

    @PrimaryGeneratedColumn({
        type:"int",
        name:"idMovimiento"
        })
    public idMovimiento:number;

    @Column("nvarchar",{
        nullable:false,
        length:50,
        name:"descripcion"
        })
    public descripcion:string;

    @Column("nchar",{
        nullable:false,
        name:"tipo"
        })
    public tipo:string;

    @OneToMany((type)=>CartolaProducto, (cartolaProducto)=>cartolaProducto.idMovimiento)
    public cartolaProductos:CartolaProducto[];

}
