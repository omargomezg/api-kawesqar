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
import {Commune} from "./Commune";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {Invoice} from "./Invoice";
import {ProofOfPurchase} from "./ProofOfPurchase";
import {RelationFamilyBranch} from "./RelationFamilyBranch";
import {RelationStoreBranch} from "./RelationStoreBranch";
import {RelationSystemUserBranch} from "./RelationSystemUserBranch";
import {ShoppingCartContent} from "./ShoppingCartContent";
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
        (commune: Commune) => commune.branches, {nullable: false})
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

    @OneToMany(
        (type: ProofOfPurchase) => ProofOfPurchase,
        (comprobanteEgreso: ProofOfPurchase) => comprobanteEgreso.branch)
    proofOfPurchase: ProofOfPurchase[];

    @OneToMany(
        (type: RelationSystemUserBranch) => RelationSystemUserBranch,
        (relationSystemUserBranch: RelationSystemUserBranch) => relationSystemUserBranch.branch)
    relationSystemUserBranch: RelationSystemUserBranch[];

    @OneToMany(
        (type: DesgloseArticulo) => DesgloseArticulo,
        (desgloseArticulo: DesgloseArticulo) => desgloseArticulo.branch)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(
        (type: Invoice) => Invoice,
        (invoice: Invoice) => invoice.branch)
    invoices: Invoice[];

    @OneToMany(
        (type: RelationFamilyBranch) => RelationFamilyBranch,
        (relationFamilyBranch: RelationFamilyBranch) => relationFamilyBranch.id)
    relationFamilyBranches: RelationFamilyBranch[];

    @OneToMany(type => TempArt, tempArt => tempArt.branch)
    tempArts: TempArt[];

    @OneToMany(type => ShoppingCartContent, tempCarro => tempCarro.store)
    shoppingCartContents: ShoppingCartContent[];

}
