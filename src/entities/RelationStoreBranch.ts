import {IsNumber, MinLength} from "class-validator";
import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {Store} from "./Store";

@Entity("bodega_sucursal", {schema: "dbo"})
export class RelationStoreBranch extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idBodegaSucursal",
        type: "int"
    })
    id: number;

    @Column("bit", {
        name: "estado",
        nullable: false
    })
    isActive: boolean;

    @ManyToOne(
        (type: Store) => Store,
        (store: Store) => store.branches, {nullable: false})
    @JoinColumn({name: "idBodega"})
    store: Store;

    @ManyToOne(
        (type: Branch) => Branch,
        (branch: Branch) => branch.stores, {nullable: false,})
    @JoinColumn({name: "idSucursal"})
    branch: Branch;

}
