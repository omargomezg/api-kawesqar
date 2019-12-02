import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {OutputType} from "./OutputType";
import {SystemUser} from "./SystemUser";

/**
 * Relation between SystemUser and OutputType
 */
@Entity("tipoEgreso_Usuario", {schema: "dbo"})
export class RelationSystemUserOutputType extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: "id",
        type: "numeric",
    })
    id: number;

    @ManyToOne(
        (type: OutputType) => OutputType,
        (tipoEgreso: OutputType) => tipoEgreso.userOutputTypes,
        {nullable: false})
    @JoinColumn({name: "idtVenta"})
    outputType: OutputType | null;

    @ManyToOne(
        (type: SystemUser) => SystemUser,
        (systemUser: SystemUser) => systemUser.tipoEgresoUsuarios,
        {nullable: false})
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

}
