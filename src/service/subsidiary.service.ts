import {Bit, Int, Numeric, NVarChar, TinyInt, VarChar} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";
import {ISubsidiaryPostModel} from "../models/request/subsidiary.model";

export class SubsidiaryService {
    private db = new Db();

    /**
     * Get all subsidiary for a user
     * @param rut
     */
    public async getAllByUser(rut: string) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .query(`select idRelacion, idSucursal, estado, selected
                from cs_relacion_usuarioSucursal
                where rutUsuario = dbo.formatearRut(${rut})`);
            return await this.setDefault(r.recordset);
        } catch (err) {
            throw new InternalServerError(err.message);
        }
    }

    public async getList() {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .query(`
                SELECT idSucursal                                                    as id
                     , rutSucursal                                                   as rut
                     , cs_sucursales.nombre                                          as descripcion
                     , direccion
                     , cs_sucursales.codigo
                     , comunas.nombre                                                as ciudad
                     , telefono
                     , rutRepLegal
                     , nombreRepLegal                                                as representante
                     , fax
                     , Giro                                                          as giro
                     , registroContado
                     , numInicialRegContado
                     , isnull(cs_sucursales.[update], GETDATE())                     as updateDate
                     , (select count(1)
                        from bodega
                                 inner join bodega_sucursal on bodega_sucursal.idBodega = bodega.idBodega
                        where bodega_sucursal.idSucursal = cs_sucursales.idSucursal) as bodegasAsociadas
                FROM cs_sucursales
                         inner join comunas on comunas.codigo = cs_sucursales.codigo`);
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    public async getById(id: number) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("id", TinyInt, id)
                .execute("PA_GET_SucursalById");
            return r.recordset[0];
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    public async update(id: number, data: ISubsidiaryPostModel) {
        const pool = await this.db.poolPromise();
        try {
            const r = await pool.request()
                .input("idSucursal", Int, id)
                .input("rutSucursal", VarChar(12), data.rutSucursal.toString)
                .input("nombre", VarChar(12), data.nombre)
                .input("direccion", VarChar(80), data.direccion)
                .input("codigo", Int, data.codigo)
                .input("telefono", VarChar(50), data.telefono)
                .input("rutRepLegal", VarChar(12), data.rutRepLegal)
                .input("nombreRepLegal", VarChar(50), data.nombreRepLegal)
                .input("fax", VarChar(50), data.fax)
                .input("giro", NVarChar(250), data.giro)
                .input("registroContado", Bit, data.registroContado)
                .input("numInicialRegContado", Numeric(18, 0), data.numInicialRegContado)
                .execute("mantenedorSucursal");
            return r.recordset;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    /**
     * Validate if any selected is true
     * @param data
     */
    private setDefault(data: any[]): any[] {
        let status = false;
        data.forEach((item: any) => {
            if (item.selected === 0) {
                status = true;
            }
        });
        if (!status) {
            data[0].selected = true;
        }
        return data;
    }

}
