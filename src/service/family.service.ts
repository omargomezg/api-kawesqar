import {ConnectionPool} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";

export class FamilyService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getByRut(rut: string) {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request()
                .query(`
            select familia.idFamilia AS id, familia.NomFamilia AS name
            from familia  inner join sucursalAsociada ca on familia.idFamilia = ca.idFamilia
            inner join cs_sucursales on ca.idSucursal = cs_sucursales.idSucursal
                inner join cs_relacion_usuarioSucursal rus on cs_sucursales.idSucursal = rus.idSucursal
            where ca.estado = 1
              and rus.rutUsuario = dbo.formatearRut('${rut}')
              and rus.estado = 1
            order by familia.NomFamilia, familia.idFamilia`);
            return r.recordset[0];
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }
}
