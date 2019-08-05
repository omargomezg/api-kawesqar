import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId
} from "typeorm";
import {Products} from "./Products";
import {Branch} from "./Branch";

@Entity("TempCarro", {schema: "dbo"})
export class TempCarro {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @ManyToOne(type => Products, articulos => articulos.tempCarros, {})
    @JoinColumn({name: "article_id", referencedColumnName: "idArticulo"})
    idArticulo: Products | null;

    @Column("int", {
        nullable: true,
        name: "cantidad"
    })
    cantidad: number | null;

    @Column("varchar", {
        nullable: false,
        length: 12,
        name: "rutUsuario"
    })
    rutUsuario: string;

    @Column("money", {
        nullable: false,
        name: "valor"
    })
    valor: number;

    @Column("bit", {
        nullable: true,
        name: "estado"
    })
    estado: boolean | null;

    @Column("int", {
        nullable: true,
        name: "idArticuloID"
    })
    idArticuloID: number | null;

    @ManyToOne(type => Branch, cs_sucursales => cs_sucursales.tempCarros, {})
    @JoinColumn({name: 'idSucursal'})
    idSucursal: Branch | null;

}
