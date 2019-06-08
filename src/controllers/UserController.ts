import {ConnectionPool} from "mssql";
import {Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put} from "routing-controllers";
import {Conn} from "../models/database";
import User from "../models/user-model";

@JsonController()
export class UserController {
    private readonly userStore: User[];

    constructor() {
        this.userStore = [
            new User(1, "James Coonce", "jcoonce", "james@none.com"),
            new User(2, "Jim Coonce", "jimcoonce", "jim@none.com"),
            new User(3, "Norman", "jcoonce", "norman@none.com")
        ];
    }

    @Get("/users")
    public getAll() {
        const conn = new Conn();
        const sql = new ConnectionPool(conn.config);
        return sql.connect()
            .then((pool) => {
                return pool.request().query("select * from cs_usuarios")
                    .then((r) => {
                        return r.recordset;
                    });
            });
    }

    @Get("/users/:id")
    @OnUndefined(404)
    public getOne(@Param("id") id: number) {
        const users = [
            new User(1, "James Coonce", "jcoonce", "james@none.com"),
            new User(2, "Jim Coonce", "jimcoonce", "jim@none.com"),
            new User(3, "Norman", "jcoonce", "norman@none.com")
        ];

        const user = users.find((x) => x.getId() === id);
        return user;
    }

    @Post("/users")
    public post(@Body() user: any) {
        const newUser = new User(Math.random(), user.name, user.username, user.email);
        return newUser;
    }

    @Put("/users/:id")
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

    @Delete("/users/:id")
    public remove(@Param("id") id: number) {
        return "Removing user...";
    }
}
