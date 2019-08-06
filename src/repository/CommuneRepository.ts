import {getManager} from "typeorm";
import {Commune} from "../entities/Commune";

export class CommuneRepository {
    public getCommune(): Promise<Commune[]> {
        return getManager()
            .getRepository(Commune)
            .createQueryBuilder("commune")
            .orderBy("commune.name")
            .getMany();
    }
}
