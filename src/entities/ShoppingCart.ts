import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {ShoppingCartContent} from "./ShoppingCartContent";
import {SystemUser} from "./SystemUser";

@Entity()
export class ShoppingCart extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;
    @OneToMany(
        (type: ShoppingCartContent) => ShoppingCartContent,
        (shoppingCartContent: ShoppingCartContent) => shoppingCartContent.content)
    @JoinColumn()
    contents: ShoppingCartContent[];
    @OneToOne(
        (type: SystemUser) => SystemUser,
        (systemUser: SystemUser) => systemUser.shoppingCart)
    @JoinColumn()
    systemUser: SystemUser;
}
