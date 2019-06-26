import {Bit, ConnectionPool, Int, Numeric, NVarChar, TinyInt, VarChar} from "mssql";
import {InternalServerError} from "routing-controllers";
import {Conn} from "../models/database";
import {ISubsidiaryPostModel} from "../models/request/subsidiary.model";

export class SubsidiaryService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getList() {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request().query(`
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
        } finally {
            await pool.close();
        }
    }

    public async getById(id: number) {
        const pool = await this.sql.connect();
        try {
            const r = await pool.request()
                .input("id", TinyInt, id)
                .execute("PA_GET_SucursalById");
            return r.recordset[0];
        } catch (e) {
            throw new InternalServerError(e.message);
        } finally {
            await pool.close();
        }
    }

    public async update(id: number, data: ISubsidiaryPostModel) {
        const pool = await this.sql.connect();
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
        } finally {
            await pool.close();
        }
    }
}
