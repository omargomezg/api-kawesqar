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
import {ProofOfPurchase} from "./ProofOfPurchase";
import {SystemUser} from "./SystemUser";

@Entity("eliminaVenta", {schema: "dbo"})
export class eliminaVenta {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;

    @ManyToOne(
        (type: ProofOfPurchase) => ProofOfPurchase,
            (proofOfPurchase: ProofOfPurchase) => proofOfPurchase.eliminaVentas,
        {nullable: false})
    @JoinColumn({name: "idFolio"})
    idFolio: ProofOfPurchase | null;

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
