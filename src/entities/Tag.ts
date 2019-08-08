import {
    BaseEntity, Column, Entity, Index, JoinColumn,
    JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne,
    PrimaryColumn, PrimaryGeneratedColumn, RelationId
} from "typeorm";

@Entity("TB_VDR_Tags", { schema: "dbo" })
export class Tag {

    @PrimaryGeneratedColumn({
        name: "TAGS_Id",
        type: "tinyint"
    })
    id: number;

    @Column("nvarchar", {
        length: 150,
        name: "TAGS_Descripcion",
        nullable: false
    })
    name: string;

    @Column("bit", {
        default: () => "(1)",
        name: "TAGS_Estado",
        nullable: true,
    })
    isActive: boolean | null;

}
