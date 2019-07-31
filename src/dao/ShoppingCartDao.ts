import {InternalServerError} from "routing-controllers";
import {Db} from "../models/db";

export class ShoppingCartDao {
    private db = new Db();

    public async save(rut: string, subsidiary: number) {
        const pool = await this.db.poolPromise();
        try {
            await pool.request().query(`
                insert into shoppingCart (rutUsuario, idSucursal, created, updated)
                values (dbo.formatearRut('${rut}'), ${subsidiary}, GETDATE(), GETDATE());
            `);
            return await this.get(rut, subsidiary);
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    public async getById(id: number) {
        const pool = await this.db.poolPromise();
        try {
            return await pool.request().query(`
                select id, rutUsuario, idSucursal, created, updated
                from shoppingCart where id = ${id};
            `);
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }

    public async get(rut: string, subsidiary: number) {
        const pool = await this.db.poolPromise();
        try {
            return await pool.request().query(`
                select id, rutUsuario, idSucursal, created, updated
                from shoppingCart where rutUsuario = dbo.formatearRut('${rut}') and idSucursal = ${subsidiary};
            `);
            // return true;
        } catch (e) {
            throw new InternalServerError(e.message);
        }
    }
}
