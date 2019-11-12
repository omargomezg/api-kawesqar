import {Get, JsonController, OnUndefined, Param} from "routing-controllers";
import {UndefinedArrayListError} from "../models/error/UndefinedArrayListError";
import {SystemUserRepository} from "../repository/SystemUserRepository";

@JsonController("/menu")
export class MenuController {
    private userRepository: SystemUserRepository;

    constructor() {
        this.userRepository = new SystemUserRepository();
    }

    @Get("/:rut")
    @OnUndefined(UndefinedArrayListError)
    public getRoot(@Param("rut") rut: string) {
        return this.userRepository.getMenu(rut);
    }

    @Get("/:rut/:parent")
    @OnUndefined(UndefinedArrayListError)
    public getMenuChildes(@Param("rut") rut: string, @Param("parent") parent: number) {
        return this.userRepository.getMenuChildes(rut, parent);
    }
}
