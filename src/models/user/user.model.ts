import AllowedDeliveriesModel from "../allowed-deliveries.model";
import {RolEnum} from "../enum/role.enum";
import {Person} from "../person.model";

class User extends Person {
    public username: string;
    public password: string;
    public allowedServices: AllowedDeliveriesModel;
    public role: RolEnum;

    constructor(rut: string,
                nombre: string,
                paterno: string,
                materno: string,
                username: string, email: string, active: boolean, password: string,
                telephone: string, allowedServices: AllowedDeliveriesModel, role: RolEnum) {
        super(rut, nombre, paterno, email, active, telephone, materno);
        this.username = username;
        this.password = password;
        this.allowedServices = allowedServices;
        this.role = role;
    }

}

export default User;
