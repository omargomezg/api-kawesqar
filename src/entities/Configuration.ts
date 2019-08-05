import {Length} from "class-validator";
import {Column, Entity} from "typeorm";

@Entity("configuracion", {schema: "dbo"})
export class Configuration {

    @Column("nvarchar", {
        length: 50,
        name: "NombreProyecto",
        nullable: false,
        primary: true
    })
    @Length(0, 50)
    systemName: string;

    @Column("text", {
        name: "Membrete",
        nullable: true
    })
    Membrete: string | null;

    @Column("int", {
        default: 19,
        name: "IVA",
        nullable: false
    })
    IVA: number | null;

    @Column("nvarchar", {
        length: 50,
        name: "smtpMail",
        nullable: true,
    })
    smtpMail: string | null;

    @Column("nchar", {
        length: 10,
        name: "puertoMail",
        nullable: true,
    })
    puertoMail: string | null;

    @Column("nchar", {
        length: 255,
        name: "usuarioMail",
        nullable: true,
    })
    usuarioMail: string | null;

    @Column("nchar", {
        length: 255,
        name: "claveMail",
        nullable: true
    })
    claveMail: string | null;

    @Column("bit", {
        name: "sslMail",
        nullable: true
    })
    sslMail: boolean | null;

    @Column("image", {
        name: "imgLogo",
        nullable: true
    })
    imgLogo: Buffer | null;

    @Column("bit", {
        default: () => "(0)",
        name: "logoCodesoft",
        nullable: true
    })
    showDefaultLogo: boolean | null;

}
