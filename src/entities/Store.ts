import {Length} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {bodega_sucursal} from "./bodega_sucursal";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {detalleExistencia} from "./detalleExistencia";
import {TempArt} from "./TempArt";

@Entity("bodega", {schema: "dbo"})
export class Store {

    @PrimaryGeneratedColumn({
        name: "idBodega",
        type: "int"
    })
    idBodega: number;

    @Column("nvarchar", {
        length: 200,
        name: "descripcion",
        nullable: false
    })
    @Length(0, 200)
    descripcion: string;

    @OneToMany(type => bodega_sucursal, bodega_sucursal => bodega_sucursal.idBodega)
    bodegaSucursals: bodega_sucursal[];

    @OneToMany(type => DesgloseArticulo, desgloseArticulo => desgloseArticulo.idBodega)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(type => detalleExistencia, detalleExistencia => detalleExistencia.idbodega)
    detalleExistencias: detalleExistencia[];

    @OneToMany(type => TempArt, tempArt => tempArt.idBodega)
    tempArts: TempArt[];

}
