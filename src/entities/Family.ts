import {Length} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
import {RelationFamilyBranch} from "./RelationFamilyBranch";

@Entity("familia", {schema: "dbo"})
export class Family {

    @PrimaryGeneratedColumn({
        name: "idFamilia",
        type: "int"
    })
    id: number;

    @Column("nvarchar", {
        length: 100,
        name: "NomFamilia",
        nullable: true,
    })
    @Length(0, 100)
    name: string | null;

    @Column("bit", {
        name: "Estado",
        nullable: true
    })
    isActive: boolean | null;

    @OneToMany(
        (type: Product) => Product, (product: Product) => product.family)
    products: Product[];

    @OneToMany((type: RelationFamilyBranch) => RelationFamilyBranch,
        (relationFamilyBranch: RelationFamilyBranch) => relationFamilyBranch.id)
    branches: RelationFamilyBranch[];

}
