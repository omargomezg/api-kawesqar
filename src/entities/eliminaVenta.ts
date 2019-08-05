import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId
} from "typeorm";
import {comprobanteEgreso} from "./comprobanteEgreso";
import {SystemUser} from "./SystemUser";

@Entity("eliminaVenta", {schema: "dbo"})
export class eliminaVenta {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @ManyToOne(type => comprobanteEgreso, comprobanteEgreso => comprobanteEgreso.eliminaVentas, {nullable: false,})
    @JoinColumn({name: 'idFolio'})
    idFolio: comprobanteEgreso | null;

    @Column("datetime", {
        nullable: false,
        name: "fecha"
    })
    fecha: Date;

    @Column("varchar", {
        nullable: false,
        length: 500,
        name: "motivo"
    })
    motivo: string;

    @ManyToOne(type => SystemUser, cs_usuarios => cs_usuarios.eliminaVentas, {nullable: false,})
    @JoinColumn({name: 'rutUsuario'})
    rutUsuario: SystemUser | null;

}
