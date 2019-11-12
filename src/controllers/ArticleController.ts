import {Get, JsonController, Param} from "routing-controllers";
import {Product} from "../entities/Product";
import {ArticleService} from "../service/article.service";

@JsonController("/article")
export class ArticleController {
    private article = new ArticleService();

    @Get("/")
    public getAll() {
        return Product.find();
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
