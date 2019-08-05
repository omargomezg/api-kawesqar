import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Person} from "./Person";
import {Role} from "./Role";

@Entity()
export class SystemUser extends Person {
    @Column()
    public enabled: boolean;
    @Column()
    public usernMane: string;
    @ManyToOne((type: any) => Role)
    @JoinColumn()
    public role: Role;

    constructor(rut: string,
                firstName: string,
                lastName: string,
                secondLastName: string,
                created: Date,
                telephone: string, mobile: string, email: string,
                enabled: boolean, userNane: string, role: Role) {
        super(rut, firstName,
            lastName,
            secondLastName,
            created,
            telephone,
            mobile,
            email);
        this.enabled = enabled;
        this.usernMane = userNane;
        this.role = role;
    }
}
