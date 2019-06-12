import { Get, JsonController, Param } from "routing-controllers";
import { MenuService } from "../service/menu.service";

@JsonController("/api/menu")
export class MenuController {

    constructor(private menuService: MenuService) {
        this.menuService = new MenuService();
    }

    @Get("/:rut")
    public getRoot(@Param("rut") rut: string) {
        return this.menuService.getRoot(rut);
    }

    @Get("/:rut/:parent")
    public getChilds(@Param("rut") rut: string, @Param("parent") parent: number) {
        return this.menuService.getChild(rut, parent);
    }
}
