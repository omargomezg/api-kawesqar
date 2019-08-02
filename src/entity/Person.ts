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

    constructor(rut: string, firstName: string, lastName: string, secondLastName: string, created: Date,
                telephone: string, movil: string, email: string) {
        this.rut = rut;
        this.firstName = firstName;
        this.lastName = lastName;
        this.secondLastName = secondLastName;
        this.created = created;
        this.telephone = telephone;
        this.movil = movil;
        this.email = email;
    }
}
