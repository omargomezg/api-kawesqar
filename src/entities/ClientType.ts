import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Client} from "./Client";

@Entity("tipoCliente", {schema: "dbo"})
export class ClientType {

    @PrimaryGeneratedColumn({
        name: "idTcliente",
        type: "int",
    })
    id: number;

    @Column("nvarchar", {
        length: 50,
        name: "descripcion",
        nullable: false,
    })
    name: string;

    @Column("bit", {
        name: "estado",
        nullable: true,
    })
    isActive: boolean | null;

    @OneToMany(
        (type: Client) => Client,
        (clients: Client) => clients.typeOfClient)
    clients: Client[];

}
