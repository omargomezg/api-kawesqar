import {Delete, Get, JsonController, Post, Put} from "routing-controllers";
import {getCustomRepository} from "typeorm";
import {Client} from "../entities/Client";
import {ClientRepository} from "../repository/ClientRepository";

@JsonController("/client")
export class ClientController {
    clientRepository = getCustomRepository(ClientRepository);

    @Get()
    public async getAll(): Promise<Client[]> {
        return await this.clientRepository.allClients();
    }

    @Put("/:rut")
    public createClient(client: Client) {
        return this.clientRepository.create(client);
    }

    @Post("/:rut")
    public async updateClient(client: Client) {
        return await this.clientRepository.save(client);
    }

    @Delete("/:rut")
    public deleteUser() {
        return "nothing here.";
    }

}
