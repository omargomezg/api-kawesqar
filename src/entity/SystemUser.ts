import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {Person} from "./Person";
import {Role} from "./Role";

@Entity()
export class SystemUser extends Person {
    @Column()
    public enabled: boolean;
    @Column()
    public usernMane: string;
    @ManyToOne(type => Role)
    @JoinColumn()
    public role: Role;

    constructor(enabled: boolean, usernMane: string, role: Role) {
        super();
        this.enabled = enabled;
        this.usernMane = usernMane;
        this.role = role;
    }
}
