import {CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ShoppingCartContent} from "./ShoppingCartContent";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn() id: number;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;
    @OneToMany(
        (type: ShoppingCartContent) => ShoppingCartContent,
        (shoppingCartContent: ShoppingCartContent) => shoppingCartContent.content)
    contents: ShoppingCartContent[];
}
