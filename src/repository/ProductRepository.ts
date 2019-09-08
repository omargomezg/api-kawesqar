import {EntityRepository, Repository} from "typeorm";
import {Product} from "../entities/Product";

@EntityRepository()
export class ProductRepository extends Repository<Product> {
}
