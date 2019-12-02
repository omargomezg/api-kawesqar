import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({schema: "dbo"})
export class Tag {

    @PrimaryGeneratedColumn({
        type: "tinyint"
    })
    id: number;

    @Column("nvarchar", {
        length: 150,
        nullable: false
    })
    name: string;

    @Column("bit", {
        default: () => "(1)",
        nullable: true,
    })
    isActive: boolean | null;

}
