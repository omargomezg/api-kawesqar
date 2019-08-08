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
import {SystemUser} from "./SystemUser";
import {OutputType} from "./OutputType";

/**
 * Relation between SystemUser and OutputType
 */
@Entity("tipoEgreso_Usuario", {schema: "dbo"})
export class RelationSystemUserOutputType extends BaseEntity {

    @ManyToOne(type => OutputType, tipoEgreso => tipoEgreso.tipoEgresoUsuarios, {nullable: false,})
    @JoinColumn({name: "idtVenta"})
    idtVenta: OutputType | null;

    @ManyToOne(type => SystemUser, cs_usuarios => cs_usuarios.tipoEgresoUsuarios, {nullable: false,})
    @JoinColumn({name: "rutUsuario"})
    systemUser: SystemUser | null;

    @Column("bit", {
        name: "estado",
        nullable: false,
    })
    isActive: boolean;

    @Column("bit", {
        name: "selDefault",
        nullable: true,
    })
    isDefault: boolean | null;

    @PrimaryGeneratedColumn({
        name: "id",
        type: "numeric",
    })
    id: number;

}
