import { ConnectionPool, NVarChar } from "mssql";
import { Conn } from "../models/database";

export class FamilyService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getByRut(rut: string) {
        const pool = await this.sql.connect();
        const r = await pool.request().query(`
        SELECT familia.idFamilia AS id, familia.NomFamilia AS name
        FROM familia
        INNER JOIN sucursalAsociada ON familia.idFamilia = sucursalAsociada.idFamilia
                                 INNER JOIN cs_sucursales ON sucursalAsociada.idSucursal = cs_sucursales.idSucursal
                                 INNER JOIN cs_relacion_usuarioSucursal
                                            ON cs_sucursales.idSucursal = cs_relacion_usuarioSucursal.idSucursal
                        WHERE sucursalAsociada.estado = 1
                          AND cs_relacion_usuarioSucursal.rutUsuario = dbo.formatearRut('${rut}')
                          AND cs_relacion_usuarioSucursal.estado = 1
                        ORDER BY familia.NomFamilia, familia.idFamilia`);
        return r.recordset[0];
    }
}
