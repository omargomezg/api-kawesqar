export class Person {
    public rut: string;
    public nombre: string;
    public email: string;
    constructor(rut: string, nombre: string, email: string) {
        this.rut = rut;
        this.nombre = nombre;
        this.email = email;
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
