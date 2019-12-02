import {Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import {SystemUser} from "../../entities/SystemUser";
import {EnabledUserModel, UpdateUserModel} from "../../models/user.index";
import {SystemUserRepository} from "../../repository/SystemUserRepository";
import {UserService} from "../../service/user.service";
import {RutUtils} from "../../Utils/RutUtils";
import {CommonController} from "../CommonController";
import {UndefinedArrayListError} from "../../models/error/UndefinedArrayListError";

@JsonController("/user")
export class UserController extends CommonController {
    private userService = new UserService();
    private uRep = new SystemUserRepository();

    @Get("")
    public getAll() {
        return this.uRep.getUsersWithRole();
    }

    @Get("/:rut")
    @OnUndefined(404)
    public getOne(@Param("rut") rut: string) {
        return this.uRep.getUserWithRoles(rut);
    }

    @Post("/:rut")
    public createUser(@Param("rut") rut: string, @Body() user: SystemUser) {
        return this.userService.create(user);
    }

    @Put("/:rut")
    public updateUser(@Param("rut") rut: string, @Body() user: SystemUser) {
        return this.uRep.update({rut: user.rut},
            user);
    }

    @Get("/:rut/sucursal")
    @OnUndefined(UndefinedArrayListError)
    public async getSubsidiaryForUser(@Param("rut") rut: string) {
        return this.uRep.getUserAndBranches(RutUtils.format(rut));
        /* return SystemUser.findOne({
             join: {
                 alias: "sucursales",
                 innerJoinAndSelect: {
                     branch: "sucursales.csRelacionUsuarioSucursals",
                     branches: "branch.branch"
                 },
             },
             select: ["rut"],
             where: {rut: RutUtils.format(rut)},
         });*/
    }

    // SystemUser _> csRelacionUsuarioSucursals _> branch

    @Get("/:rut/exists")
    @OnUndefined(404)
    public getExists(@Param("rut") rut: string) {
        return this.userService.getExists(rut);
    }

    @Get("/:rut/discount")
    @OnUndefined(404)
    public getDiscount(@Param("rut") rut: string) {
        return this.userService.getDiscountUser(rut);
    }

    @Post("/:rut/default/subsidiary")
    public setDefaultSubsidiaryForUser(@Param("rut") rut: string, @Body() data: any) {
        return this.userService.setDefaultSubsidiaryForUser(data);
    }

    @Delete("/:rut/enabled")
    public remove(@Param("rut") rut: string, @Body() model: EnabledUserModel) {
        return this.userService.enabled(rut, model);
    }
}
