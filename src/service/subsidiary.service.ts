import { Bit, ConnectionPool, Int, Numeric, NVarChar, TinyInt, VarChar } from "mssql";
import { Conn } from "../models/database";
import { ISubsidiaryPostModel } from "../models/request/subsidiary.model";

export class SubsidiaryService {
    private conn = new Conn();
    private sql = new ConnectionPool(this.conn.config);

    public async getList() {
        const pool = await this.sql.connect();
        const r = await pool.request().query(`
        SELECT idSucursal as id
            ,rutSucursal as rut
            ,cs_sucursales.nombre as descripcion
            ,direccion
            ,cs_sucursales.codigo
            ,comunas.nombre as ciudad
            ,telefono
            ,rutRepLegal
            ,nombreRepLegal as representante
            ,fax
            ,Giro as giro
            ,registroContado
            ,numInicialRegContado
            ,isnull(cs_sucursales.[update], GETDATE()) as updateDate
            ,(select count(1)
                from bodega inner join bodega_sucursal on bodega_sucursal.idBodega = bodega.idBodega
                where bodega_sucursal.idSucursal = cs_sucursales.idSucursal) as bodegasAsociadas
        FROM cs_sucursales inner join comunas on comunas.codigo = cs_sucursales.codigo`);
        pool.close();
        return r.recordset;
    }

    public async getById(id: number) {
        const pool = await this.sql.connect();
        const r = await pool.request()
            .input("id", TinyInt, id)
            .execute("PA_GET_SucursalById");
        pool.close();
        return r.recordset[0];
    }

    public async update(id: number, data: ISubsidiaryPostModel) {
        const pool = await this.sql.connect();
        const r = await pool.request()
            .input("idSucursal", Int, id)
            .input("rutSucursal", VarChar(12), data.rutSucursal.toString)
            .input("nombre", VarChar(12), data.getNombre())
            .input("direccion", VarChar(80), data.getDireccion())
            .input("codigo", Int, data.getCodigo())
            .input("telefono", VarChar(50), data.getTelefono())
            .input("rutRepLegal", VarChar(12), data.getRutRepLegal())
            .input("nombreRepLegal", VarChar(50), data.getNombreRepLegal())
            .input("fax", VarChar(50), data.getFax())
            .input("giro", NVarChar(250), data.getGiro())
            .input("registroContado", Bit, data.getRegistroContado())
            .input("numInicialRegContado", Numeric(18, 0), data.getNumInicialRegContado())
            .execute("mantenedorSucursal");
        pool.close();
        return r.recordset;
    }
}
