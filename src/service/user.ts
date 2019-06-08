import {ConnectionPool} from "mssql";
import {Conn} from "../models/database";

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
}
