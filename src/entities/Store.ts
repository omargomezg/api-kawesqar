import {Length} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RelationStoreBranch} from "./RelationStoreBranch";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {detalleExistencia} from "./detalleExistencia";
import {ShoppingCartContent} from "./ShoppingCartContent";
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

    @OneToMany(
        (type: RelationStoreBranch) => RelationStoreBranch,
            (brnaches: RelationStoreBranch) => brnaches.store)
    branches: RelationStoreBranch[];

    @OneToMany(type => DesgloseArticulo, desgloseArticulo => desgloseArticulo.idBodega)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(type => detalleExistencia, detalleExistencia => detalleExistencia.store)
    detalleExistencias: detalleExistencia[];

    @OneToMany(type => TempArt, tempArt => tempArt.idBodega)
    tempArts: TempArt[];

    @OneToMany((type: ShoppingCartContent) => ShoppingCartContent,
            (shoppingCartContent) => shoppingCartContent.content)
    content: ShoppingCartContent[];

}
