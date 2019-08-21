import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("BaseFirmas", {schema: "dbo"})
export class BaseFirmas {

    @PrimaryGeneratedColumn({
        name: "IdBaseFirma",
        type: "int"
    })
    id: number;

    @Column("text", {
        name: "Campo1",
        nullable: false
    })
    Campo1: string;

    @Column("bit", {
        default: () => "(1)",
        name: "estado",
        nullable: true
    })
    isActive: boolean | null;

}
