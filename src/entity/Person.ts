import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Person {
    @PrimaryColumn()
    public rut: string;
    @Column()
    public firstName: string;
    @Column()
    public lastName: string;
    @Column()
    public secondLastName: string;
    @Column()
    public created: Date;
    @Column()
    public telephone: string;
    @Column()
    public movil: string;
    @Column()
    public email: string;
}
