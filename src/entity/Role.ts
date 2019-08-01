import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
