import {BaseEntity, Column, PrimaryColumn} from "typeorm";

export abstract class Person extends BaseEntity {
    @PrimaryColumn("nvarchar", {
        length: 12,
        nullable: false,
        primary: true,
    })
    rut: string;

    @Column("varchar", {
        length: 50,
        nullable: false,
    })
    firstName: string;

    @Column("nvarchar", {
        length: 50,
        nullable: false,
    })
    lastName: string;

    @Column("nvarchar", {
        length: 50,
        nullable: true,
    })
    secondLastName: string | null;

    @Column("nvarchar", {
        length: 256,
        nullable: true,
    })
    email: string | null;

    @Column({
        name: "fono"
    })
    telephone: string;
}
