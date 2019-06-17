export class Person {
    public rut: string;
    public nombre: string;
    public paterno: string;
    public materno: string;
    public email: string;
    public active: boolean;
    public telephone: string;

    constructor(rut: string, nombre: string, paterno: string,
                email: string, active: boolean, telephone: string, materno?: string) {
        this.rut = rut;
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno == null ? "" : materno;
        this.email = email;
        this.active = active;
        this.telephone = telephone;
    }

    public getRut(): string {
        return this.rut;
    }

    public setRut(value: string) {
        this.rut = value;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(value: string) {
        this.email = value;
    }
}
