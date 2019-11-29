import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Branch} from "./Branch";
import {DesgloseArticulo} from "./DesgloseArticulo";
import {DocumentTypeForInput} from "./DocumentTypeForInput";
import {HistArticulos} from "./HistArticulos";
import {InvoiceContent} from "./InvoiceContent";
import {Note} from "./Note";
import {Product} from "./Product";
import {Supplier} from "./Supplier";
import {SystemUser} from "./SystemUser";
import {TempArt} from "./TempArt";

@Entity("facturas", {schema: "dbo"})
export class Invoice extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "idFact",
        type: "int"
    })
    id: number;

    @Column("char", {
        length: 10,
        name: "NFactura",
        nullable: false
    })
    number: string;

    @Column("datetime", {
        name: "Fecha",
        nullable: false
    })
    date: Date;

    @Column("datetime", {
        name: "fechaIngreso",
        nullable: true
    })
    creation: Date | null;

    @Column("varchar", {
        default: () => "'EP'",
        length: 50,
        name: "estadoUso",
        nullable: true
    })
    estadoUso: string | null;

    @Column("int", {
        name: "valImpuesto",
        nullable: true
    })
    valImpuesto: number | null;

    @Column("varchar", {
        name: "notas",
        nullable: true
    })
    notas: string | null;

    @ManyToOne(
        (type: Supplier) => Supplier,
        (supplier: Supplier) => supplier.invoices,
        {nullable: false})
    @JoinColumn({name: "ProvRut"})
    supplier: Supplier | null;

    @ManyToOne(
        (type: DocumentTypeForInput) => DocumentTypeForInput,
        (documentTypeForInput: DocumentTypeForInput) => documentTypeForInput.invoices,
        {nullable: false})
    @JoinColumn({name: "idTipoDocIn"})
    documentType: DocumentTypeForInput | null;

    @ManyToOne(
        (type: SystemUser) => SystemUser,
        (systemUser: SystemUser) => systemUser.invoices)
    @JoinColumn({name: "rutUsuario"})
    systemUser: SystemUser | null;

    @ManyToOne(
        (type: Branch) => Branch,
        (branch: Branch) => branch.invoices)
    @JoinColumn({name: "Sucursal"})
    branch: Branch | null;

    @OneToMany(
        (type: DesgloseArticulo) => DesgloseArticulo,
        (desgloseArticulo: DesgloseArticulo) => desgloseArticulo.invoice)
    desgloseArticulos: DesgloseArticulo[];

    @OneToMany(
        (type: InvoiceContent) => InvoiceContent,
        (invoiceContent: InvoiceContent) => invoiceContent.invoice)
    content: InvoiceContent[];

    @OneToMany(type => HistArticulos, histArticulos => histArticulos.invoice)
    histArticuloss: HistArticulos[];

    @OneToMany(type => TempArt, tempArt => tempArt.invoice)
    tempArts: TempArt[];

    @OneToMany(
        (type) => Note,
        (note: Note) => note.invoice)
    notes: Note[];

    @OneToMany(
        (type) => Product,
        (product: Product) => product)
    products: Product[];

}
