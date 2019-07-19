import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class FamilyService {
    private db = new Db();

    public async getByRut(rut: string) {
        const pool = await this.db.poolPromise();
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
        }
    }
}
