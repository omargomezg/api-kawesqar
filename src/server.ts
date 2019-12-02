import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {createConnection} from "typeorm";

process.on("uncaughtException", (e) => {
    // tslint:disable-next-line:no-console
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", (e) => {
    // tslint:disable-next-line:no-console
    console.log(e);
    process.exit(1);
});

const {PORT = 8089} = process.env;

createConnection().then((connection) => {
    console.log("connected to rom");
}).catch((error) => console.log(error));

const app = createExpressServer({
    controllers: [__dirname + "/controllers/*.ts", __dirname + "/controllers/*/*.ts"
    ],
    cors: true,
    routePrefix: "/api"
});

app.listen(PORT, () =>
    // tslint:disable-next-line:no-console
    console.log(`Server is running in port ${PORT}...`)
);
