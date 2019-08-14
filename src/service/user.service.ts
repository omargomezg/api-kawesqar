import {throws} from "assert";
import {Bit, Int, NChar, NVarChar, VarChar} from "mssql";
import {InternalServerError} from "routing-controllers";
import {OutputType} from "../entities/OutputType";
import {RelationSystemUserOutputType} from "../entities/RelationSystemUserOutputType";
import {SystemUser} from "../entities/SystemUser";
import {Db} from "../models/db";
import {UserExistsModel} from "../models/response/user.exists.model";
import {EnabledUserModel} from "../models/user.index";
import User from "../models/user/user.model";

export class UserService {
    private db = new Db();

    public async getAll() {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .query(`
                    select rut as rut,
                           nombres,
                           apPaterno,
                           apMaterno,
                           fechaCreacion,
                           estado,
                           userName,
                           fono,
                           eMail,
                           salidaVenta,
                           salidaFactura,
                           salidaEmpleados,
                           traspaso,
                           credito,
                           discount,
                           updated,
                           DefaultRol = ISNULL((
                               select top 1 rol.titulo
                               from cs_rol rol
                                   inner join cs_relacion_usuarioRol ur ON ur.idRol = rol.idRol
                               where ur.rutUsuario = cs_usuarios.rut and ur.estado = 1), (
                                   select titulo from cs_rol where idRol = rol))
                    from cs_usuarios
                    Order By updated desc`);
            return r.recordset;
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    public async getSucursal(rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .query(`
                    select cs_sucursales.idSucursal AS id,
                           cs_sucursales.nombre + ' ' + cs_sucursales.direccion AS descripcion,
                           cs_relacion_usuarioSucursal.selected AS isPrimary
                    from cs_sucursales inner join cs_relacion_usuarioSucursal
                        on cs_sucursales.idSucursal = cs_relacion_usuarioSucursal.idSucursal
                    where dbo.formatearRut(cs_relacion_usuarioSucursal.rutUsuario) = '${rut}'
                      and cs_relacion_usuarioSucursal.estado = 1`);
            return r.recordset;
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    public async getByRut(rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rut", NVarChar(12), rut)
                .execute("userByRut");
            return r.recordset[0];
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    public async getExists(rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .query(`
                    select users = count(1)
                    from cs_usuarios
                    where rut = dbo.formatearRut('${rut}')
        `);
            return new UserExistsModel(r.recordset[0].users > 0);
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    public async getDiscountUser(rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("user.model.ts", NVarChar(12), rut)
                .execute("getDiscountStatus");
            return r.recordset[0];
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    public async setDefaultSubsidiaryForUser(data: any) {
        const pool = await this.db.poolPromise();
        try {
            await pool.request()
                .query(`
                update cs_relacion_usuarioSucursal set selected = 0
                where rutUsuario = dbo.formatearRut('${data.rut}');
                update cs_relacion_usuarioSucursal set selected = 1
                where rutUsuario = dbo.formatearRut('${data.rut}') and idSucursal = ${data.idSubsidiary};
        `);
            return data;
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    public async create(user: SystemUser) {
        await SystemUser.create(user);
        // TODO poblar relationSystemUserOutputType y setear opción por defecto
        const relation: RelationSystemUserOutputType[] = [];
        const outputType = await OutputType.find();
        if (outputType === undefined) {
            throw new Error("Outpiut is undefined");
        }
        outputType.forEach((item) => console.log(item));
        /*const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rutUsuario", VarChar(12), user.rut)
                .input("nombres", NVarChar(256), user.nombre)
                .input("apPaterno", NVarChar(256), user.paterno)
                .input("apMaterno", NVarChar(256), user.materno)
                .input("clave", NVarChar(50), user.password)
                .input("userName", VarChar(50), user.username)
                .input("fono", NChar(10), user.telephone)
                .input("eMail", NVarChar(256), user.email)
                .input("salidaVenta", Bit, user.allowedServices.sales)
                .input("salidaFactura", Bit, user.allowedServices.bill)
                .input("salidaEmpleados", Bit, user.allowedServices.employees)
                .input("idEgresoDefault", Bit, true)
                .input("rol", Int, user.role)
                .execute("mantenedorUsuario");
            return r.recordset[0];
        } catch (err) {
            throw new InternalServerError(err.message);
        }*/
    }

    public async update(user: User) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("rutUsuario", VarChar(12), user.rut)
                .input("nombres", NVarChar(256), user.nombre)
                .input("apPaterno", NVarChar(256), user.paterno)
                .input("apMaterno", NVarChar(256), user.materno)
                .input("clave", NVarChar(50), user.password)
                .input("userName", VarChar(50), user.username)
                .input("fono", NChar(10), user.telephone)
                .input("eMail", NVarChar(256), user.email)
                .input("salidaVenta", Bit, user.allowedServices.sales)
                .input("salidaFactura", Bit, user.allowedServices.bill)
                .input("salidaEmpleados", Bit, user.allowedServices.employees)
                .input("idEgresoDefault", Bit, true)
                .input("rol", Int, user.role)
                .execute("mantenedorUsuario");
            return r.recordset[0];
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    public async enabled(rut: string, model: EnabledUserModel) {
        if (rut !== model.rut) {
            throw new Error("Las claves no son identicas");
        }
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request().query(`UPDATE cs_usuarios SET updated = GETDATE(),
            estado = CAST('${model.enabled}' as bit)
            WHERE rut = dbo.formatearRut('${rut}')`);
            return r.rowsAffected;
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }
}
