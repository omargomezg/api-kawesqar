import { Person } from "./person.model";

class User extends Person {
    public username: string;

    constructor(rut: string, nombre: string, username: string, email: string) {
        super(rut, nombre, email);
        this.username = username;
    }

}

export default User;
