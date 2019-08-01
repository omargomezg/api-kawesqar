import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public rut: string;
    @ManyToOne()
    public public;

}
