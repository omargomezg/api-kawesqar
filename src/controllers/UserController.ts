import {Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import {OutputType} from "../entities/OutputType";
import {RelationSystemUserOutputType} from "../entities/RelationSystemUserOutputType";
import {SystemUser} from "../entities/SystemUser";
import { CreateUserModel, EnabledUserModel, UpdateUserModel} from "../models/user.index";
import {UserService} from "../service/user.service";

@JsonController("/api/user")
export class UserController {
    private user = new UserService();

    @Get("")
    public getAll() {
        return this.user.getAll();
    }

    @Get("/:rut")
    @OnUndefined(404)
    public getOne(@Param("rut") rut: string) {
        return this.user.getByRut(rut);
    }

    @Get("/:rut/sucursal")
    @OnUndefined(404)
    public getSubsidiaryForUser(@Param("rut") rut: string) {
        return this.user.getSucursal(rut);
    }

    @Get("/:rut/exists")
    @OnUndefined(404)
    public getExists(@Param("rut") rut: string) {
        return this.user.getExists(rut);
    }

    @Get("/:rut/discount")
    @OnUndefined(404)
    public getDiscount(@Param("rut") rut: string) {
        return this.user.getDiscountUser(rut);
    }

    @Post("/:rut")
    public createUser(@Param("rut") rut: string, @Body() user: SystemUser) {
        const userSystem = new SystemUser();
        userSystem.rut = rut;
        userSystem.credito = false;
        userSystem.discount = false;
        const initialRelation: OutputType.
        const relation = new RelationSystemUserOutputType();

        realtion.push(new RelationSystemUserOutputType());
        realtion.push(new RelationSystemUserOutputType());
        userSystem.tipoEgresoUsuarios = relations;
        return userSystem;
        // return this.user.create(user);
    }

    @Post("/:rut/default/subsidiary")
    public setDefaultSubsidiaryForUser(@Param("rut") rut: string, @Body() data: any) {
        return this.user.setDefaultSubsidiaryForUser(data);
    }

    @Put("/:rut")
    public updateUser(@Param("rut") rut: string, @Body() user: UpdateUserModel) {
        return this.user.update(user);
    }

    @Delete("/:rut/enabled")
    public remove(@Param("rut") rut: string, @Body() model: EnabledUserModel) {
        return this.user.enabled(rut, model);
    }
}
