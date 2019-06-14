import { ConnectionPool, NVarChar } from "mssql";
import { Conn } from "../models/database";
import { UserExistsModel } from "../models/response/user.exists.model";
import User from "../models/user.model";

export class UserService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getAll() {
        const pool = await this.sql.connect();
        const r = await pool.request().query(`SELECT rutUsuario,
        nombres, apPaterno, apMaterno,
        fechaCreacion,
        estado,
        userName,
        imagenPerfil,imagenTipo,
        fono,
        eMail,
        salidaVenta,
        salidaFactura,
        salidaEmpleados,
        traspaso,
        credito,
        discount,
        updated,
        DefaultRol = ISNULL((SELECT top 1 rol.titulo
                FROM cs_rol rol
                INNER JOIN cs_relacion_usuarioRol ur ON ur.idRol = rol.idRol
                WHERE ur.rutUsuario = cs_usuarios.rutUsuario
                and ur.estado = 1), (select titulo from cs_rol where idRol = rol))\n                FROM cs_usuarios
        Order By updated desc`);
        pool.close();
        return r.recordset;
    }

    public async getSucursal(rut: string) {
        const pool = await this.sql.connect();
        const r = await pool.request().query(`
        SELECT cs_sucursales.idSucursal AS id,
                    cs_sucursales.nombre + ' ' + cs_sucursales.direccion AS descripcion
                    FROM cs_sucursales INNER JOIN cs_relacion_usuarioSucursal
                        ON cs_sucursales.idSucursal = cs_relacion_usuarioSucursal.idSucursal
                    WHERE dbo.formatearRut(cs_relacion_usuarioSucursal.rutUsuario) = '${rut}' AND
                    cs_relacion_usuarioSucursal.estado = 1`);
        pool.close();
        return r.recordset;
    }

    public async getByRut(rut: string) {
        const pool = await this.sql.connect();
        const r = await pool.request().query(`
        SELECT nombres,
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
                    rol = ISNULL((SELECT top 1 rol.idRol FROM cs_rol rol INNER JOIN
                        cs_relacion_usuarioRol ur ON ur.idRol = rol.idRol
                        WHERE  ur.rutUsuario = cs_usuarios.rutUsuario and ur.estado = 1
                        ), rol)
        FROM cs_usuarios WHERE rutUsuario = dbo.formatearRut('${rut}')`);
        pool.close();
        return r.recordset;
    }

    public async getExists(rut: string) {
        const pool = await this.sql.connect();
        const r = await pool.request().query(`
        SELECT users = count(1)
        FROM cs_usuarios
        WHERE rutUsuario = dbo.formatearRut('${rut}')
        `);
        pool.close();
        return new UserExistsModel(r.recordset[0].users > 0);
    }

    public async getDiscountUser(rut: string) {
        const pool = await this.sql.connect();
        const r = await pool.request()
            .input("user", NVarChar(12), rut)
            .execute("getDiscountStatus");
        pool.close();
        return r.recordset[0];
    }

    public async create(user: User) {
        const pool = await this.sql.connect();
        const r = await pool.request()
            .input("user", NVarChar(12), user.getRut())
            .execute("mantenedorUsuario");
        pool.close();
        return r.recordset[0];
    }
}
