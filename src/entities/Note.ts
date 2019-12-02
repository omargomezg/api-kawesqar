import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Invoice} from "./Invoice";
import {Product} from "./Product";

@Entity()
export class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(
        (type) => Invoice,
        (invoice: Invoice) => invoice.notes)
    invoice: Invoice;
    @ManyToOne(
        (type) => Product,
        (product: Product) => product.notes
    )
    product: Product;
    @Column() note: string;
    @CreateDateColumn() created: Date;
    @UpdateDateColumn() updated: Date;
}
