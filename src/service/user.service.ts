import { ConnectionPool } from "mssql";
import { Conn } from "../models/database";

export class UserService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public getAll() {
        return this.sql.connect()
            .then((pool) => {
                return pool.request().query(`SELECT rutUsuario,
                nombres,
                apPaterno,
                [apMaterno],
                [fechaCreacion],
                [estado],
                [userName],
                [imagenPerfil],
                [imagenTipo],
                [fono],
                [eMail],
                [salidaVenta],
                [salidaFactura],
                [salidaEmpleados],
                [traspaso],
                [credito],
                [discount],
                updated,
                DefaultRol = ISNULL((SELECT top 1 rol.titulo
                FROM cs_rol rol
                INNER JOIN cs_relacion_usuarioRol ur ON ur.idRol = rol.idRol
                WHERE ur.rutUsuario = cs_usuarios.rutUsuario
                and ur.estado = 1), (select titulo from cs_rol where idRol = rol))
                FROM cs_usuarios
                Order By updated desc`)
                    .then((r) => {
                        return r.recordset;
                    });
            });
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
}
