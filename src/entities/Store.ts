import {Length} from "class-validator";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {DetalleExistencia} from "./DetalleExistencia";
import {ProofOfPurchaseDetail} from "./ProofOfPurchaseDetail";
import {RelationStoreBranch} from "./RelationStoreBranch";
import {ShoppingCartContent} from "./ShoppingCartContent";
import {TempArt} from "./TempArt";

@Entity("bodega", {schema: "dbo"})
export class Store extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idBodega",
        type: "int"
    })
    id: number = 0;

    @Column("nvarchar", {
        length: 200,
        name: "descripcion",
        nullable: false
    })
    @Length(0, 200)
    description: string;

    @OneToMany(
        (type: ProofOfPurchaseDetail) => ProofOfPurchaseDetail,
        (proofOfPurchaseDetail: ProofOfPurchaseDetail) => proofOfPurchaseDetail.store
    )
    proofOfPurchaseDetail: ProofOfPurchaseDetail[];

    @OneToMany(
        (type: RelationStoreBranch) => RelationStoreBranch,
        (brnaches: RelationStoreBranch) => brnaches.store)
    branches: RelationStoreBranch[];

    @OneToMany(type => DesgloseArticulo, desgloseArticulo => desgloseArticulo.store)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(
        (type: DetalleExistencia) => DetalleExistencia,
        (detalleExistencia: DetalleExistencia) => detalleExistencia.store)
    detalleExistencias: DetalleExistencia[];

    @OneToMany(type => TempArt, tempArt => tempArt.store)
    tempArts: TempArt[];

    @OneToMany((type: ShoppingCartContent) => ShoppingCartContent,
        (shoppingCartContent) => shoppingCartContent.content)
    content: ShoppingCartContent[];

}
