import {Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import User from "../models/user-model";
import {CityService} from "../service/city";

@JsonController("/api")
export class CityController {
    private readonly userStore: User[];

    constructor() {
        this.userStore = [
            new User(1, "James Coonce", "jcoonce", "james@none.com"),
            new User(2, "Jim Coonce", "jimcoonce", "jim@none.com"),
            new User(3, "Norman", "jcoonce", "norman@none.com")
        ];
    }

    @Get("/city")
    public getAll() {
        const city = new CityService();
        return city.getAll();
    }

    @Get("/city/:id")
    @OnUndefined(404)
    public getOne(@Param("id") id: number) {
        const city = new CityService();
        return city.getAll();
    }

    @Post("/city")
    public post(@Body() user: any) {
        const newUser = new User(Math.random(), user.name, user.username, user.email);
        return newUser;
    }

    @Put("/city/:id")
    public put(@Param("id") id: number, @Body() user: any) {
        const currentUser = this.userStore.find((x) => x.getId() === id);
        if (currentUser !== undefined) {
            currentUser.setName(user.name);
            currentUser.setUsername(user.username);
            currentUser.setEmail(user.email);
            return currentUser;
        }

        return "No user found";
    }

    @Delete("/city/:id")
    public remove(@Param("id") id: number) {
        return "Removing user...";
    }
}
