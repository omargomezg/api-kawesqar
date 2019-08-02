import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {SystemUser} from "./SystemUser";

@Entity()
export class ShoppingCart {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public rut: string;
    @OneToOne((type: any) => SystemUser)
    @JoinColumn()
    public user: SystemUser;

    constructor(id: number, rut: string, user: SystemUser) {
        this.id = id;
        this.rut = rut;
        this.user = user;
    }
}
