import {InternalServerError} from "routing-controllers";
import {getCustomRepository} from "typeorm";
import {Db} from "../models/db";
import {CommuneRepository} from "../repository/CommuneRepository";

export class CityService {
    private db = new Db();

    public async getAll() {
        const repo = new CommuneRepository();
        return repo.getCommune();
    }
}
