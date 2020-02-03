import {EntityRepository, Repository} from "typeorm";
import {Client} from "../entities/Client";

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
    allClients(): Promise<Client[]> {
        return this.find({});
    }

    async deleteClient(client: Client) {
        // Nothing
    }

}
