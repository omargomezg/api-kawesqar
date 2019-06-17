import {Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import User from "../models/user.model";
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
    public post(@Body() user: User) {
        return this.user.create(user);
    }

    @Put("/users/:id")
    public put(@Param("id") id: number, @Body() user: any) {

        return "No user found";
    }

    @Delete("/users/:id")
    public remove(@Param("id") id: number) {
        return "Removing user...";
    }
}
