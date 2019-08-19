import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {Store} from "./Store";

@Entity("bodega_sucursal", {schema: "dbo"})
export class RelationStoreBranch {

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
    store: Store | null;

    @ManyToOne(
        (type: Branch) => Branch,
        (branch: Branch) => branch.stores, {nullable: false,})
    @JoinColumn({name: "idSucursal"})
    branch: Branch | null;

}
