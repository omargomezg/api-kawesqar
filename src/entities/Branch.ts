import {Length} from "class-validator";
import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { RelationStoreBranch} from "./RelationStoreBranch";
import {Commune} from "./Commune";
import {comprobanteEgreso} from "./comprobanteEgreso";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {facturas} from "./facturas";
import {RelationSystemUserBranch} from "./RelationSystemUserBranch";
import {ShoppingCartContent} from "./ShoppingCartContent";
import {RelationFamilyBranch} from "./RelationFamilyBranch";
import {SystemUser} from "./SystemUser";
import {TempArt} from "./TempArt";

@Entity("cs_sucursales", {schema: "dbo"})
export class Branch extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idSucursal",
        type: "tinyint",
    })
    @Index()
    id: number;

    @Column("varchar", {
        length: 12,
        name: "rutSucursal",
        nullable: false,
    })
    rut: string;

    @Column("varchar", {
        length: 50,
        name: "nombre",
        nullable: false,
    })
    name: string;

    @Column("varchar", {
        length: 80,
        name: "direccion",
        nullable: true,
    })
    address: string | null;

    @ManyToOne(
        (type: Commune) => Commune,
        (comunas: Commune) => comunas.branches, {nullable: false})
    @JoinColumn({name: "codigo"})
    commune: Commune | null;

    @Column("varchar", {
        length: 50,
        name: "telefono",
        nullable: true,
    })
    @Length(0, 50)
    telephone: string | null;

    @Column("varchar", {
        length: 12,
        name: "rutRepLegal",
        nullable: false,
    })
    @Length(0, 12)
    rutRepLegal: string;

    @Column("varchar", {
        length: 50,
        name: "nombreRepLegal",
        nullable: false,
    })
    @Length(0, 50)
    nombreRepLegal: string;

    @Column("varchar", {
        length: 50,
        name: "fax",
        nullable: true,
    })
    @Length(0, 50)
    fax: string | null;

    @Column("nvarchar", {
        length: 250,
        name: "Giro",
        nullable: true,
    })
    @Length(0, 250)
    Giro: string | null;

    @Column("bit", {
        name: "registroContado",
        nullable: false,
    })
    registroContado: boolean;

    @Column("numeric", {
        default: () => "(0)",
        name: "numInicialRegContado",
        nullable: true,
        scale: 0,
    })
    numInicialRegContado: number | null;

    @OneToOne(
        (type: SystemUser) => SystemUser,
            (systemUser: SystemUser) => systemUser)
    @JoinColumn({name: "rutRepLegal"})
    legalRepresentative: SystemUser;

    @OneToMany(
        (type: RelationStoreBranch) => RelationStoreBranch,
        (relationStoreBranch: RelationStoreBranch) => relationStoreBranch.branch)
    stores: RelationStoreBranch[];

    @OneToMany(type => comprobanteEgreso, comprobanteEgreso => comprobanteEgreso.idSucursal)
    comprobanteEgresos: comprobanteEgreso[];

    @OneToMany(type => RelationSystemUserBranch, cs_relacion_usuarioSucursal => cs_relacion_usuarioSucursal.branch)
    csRelacionUsuarioSucursals: RelationSystemUserBranch[];

    @OneToMany(type => DesgloseArticulo, desgloseArticulo => desgloseArticulo.idSucursal)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(type => facturas, facturas => facturas.sucursal)
    facturass: facturas[];

    @OneToMany(
        (type: RelationFamilyBranch) => RelationFamilyBranch,
            (relationFamilyBranch: RelationFamilyBranch) => relationFamilyBranch.id)
    branches: RelationFamilyBranch[];

    @OneToMany(type => TempArt, tempArt => tempArt.idSucursal)
    tempArts: TempArt[];

    @OneToMany(type => ShoppingCartContent, tempCarro => tempCarro.store)
    tempCarros: ShoppingCartContent[];

}
