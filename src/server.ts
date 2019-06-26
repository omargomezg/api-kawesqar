import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { CityController } from "./controllers/CityController";
import { EgressController } from "./controllers/EgressController";
import { ExistenceController } from "./controllers/ExistenceController";
import { FamilyController } from "./controllers/FamilyController";
import { HeaderController } from "./controllers/HeaderController";
import { MeasureController } from "./controllers/MeasureController";
import { MenuController } from "./controllers/MenuController";
import { RoleController } from "./controllers/RoleController";
import { SubsidiaryController } from "./controllers/SubsidiaryController";
import { SupplierController } from "./controllers/SupplierController";
import { UserController } from "./controllers/UserController";

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

const { PORT = 8088 } = process.env;

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const app = createExpressServer({
    controllers: [UserController,
        CityController, EgressController, SupplierController, MeasureController,
        HeaderController,
        FamilyController,
        ExistenceController,
        MenuController,
        RoleController,
        SubsidiaryController
    ],
    cors: true
});

app.listen(PORT, () =>
    // tslint:disable-next-line:no-console
    console.log(`Server is running in port ${PORT}...`)
);
