import {Get, JsonController, Param} from "routing-controllers";
import {ArticleService} from "../service/article.service";
import {CityService} from "../service/city.service";

@JsonController("/api/article")
export class ArticleController {
    private article = new ArticleService();

    @Get("/")
    public getAll() {
        const city = new CityService();
        return city.getAll();
    }

    @Get("/:key")
    public getByKeyOrName(@Param("key") key: string) {
        return this.article.getBySkuOrName(key);
    }

    @Get("/sku/:key/:bulk/:rut")
    public getByKey(@Param("key") key: string,
                    @Param("bulk") bulk: string,
                    @Param("rut") rut: string) {
        return this.article.getBySku(key, bulk === "true", rut);
    }
}
