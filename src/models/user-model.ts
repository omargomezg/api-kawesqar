export default class User {

    private id: number;
    private email: string;
    private username: string;
    private name: string;

    constructor(id: number, name: string, username: string, email: string) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }

    public getId(): number {
        return this.id;
    }

    public setId(value: number) {
        this.id = value;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(value: string) {
        this.username = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(value: string) {
        this.email = value;
    }
}
