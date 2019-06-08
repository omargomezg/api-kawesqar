import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import { useExpressServer} from "routing-controllers";
import { UserController} from "./controllers/UserController";
// import routes from './routes/';

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

const {PORT = 5000} = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});*/
// app.use('/', routes);

useExpressServer(app, {
   controllers: [UserController]
});

app.listen(PORT, () =>
    // tslint:disable-next-line:no-console
    console.log(`Server is running in port ${PORT}...`)
);
