import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("Errores", {schema: "dbo"})
export class Bug extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "IdError",
        type: "int"
    })
    id: number;

    @Column("text", {
        name: "mensaje",
        nullable: true
    })
    message: string | null;

    @Column("text", {
        name: "pagina",
        nullable: true
    })
    source: string | null;

    @CreateDateColumn()
    created: Date | null;

}
