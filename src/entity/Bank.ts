import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("bancos")
export class Bank {
    @PrimaryGeneratedColumn({name: "idBanco"})
    public id: number;
    @Column({name: "descripcion", type: "varchar", length: 60, nullable: false})
    public name: string;
    @Column({name: "estado", type: "bit"})
    public enabled: boolean;

    constructor(id: number, name: string, enabled: boolean) {
        this.id = id;
        this.name = name;
        this.enabled = enabled;
    }
}
