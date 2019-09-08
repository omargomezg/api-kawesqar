import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";
import { ArticleController } from "./controllers/ArticleController";
import { BankController } from "./controllers/BankController";
import { BranchController } from "./controllers/BranchController";
import { CityController } from "./controllers/CityController";
import { EgressController } from "./controllers/EgressController";
import { ExistenceController } from "./controllers/ExistenceController";
import { FamilyController } from "./controllers/FamilyController";
import { HeaderController } from "./controllers/HeaderController";
import { MeasureController } from "./controllers/MeasureController";
import { MenuController } from "./controllers/MenuController";
import { RoleController } from "./controllers/RoleController";
import { ShoppingCartController } from "./controllers/ShoppingCartController";
import { StoreBranchController } from "./controllers/store/StoreBranchController";
import { StoreController } from "./controllers/StoreController";
import { SubsidiaryController } from "./controllers/SubsidiaryController";
import { SupplierController } from "./controllers/SupplierController";
import { UserController } from "./controllers/user/UserController";
import { UserStoreController } from "./controllers/user/UserStoreController";
import { UserTurnController } from "./controllers/user/UserTurnController";

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

const { PORT = 8089 } = process.env;

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

createConnection().then((connection) => {
    console.log("connected to rom");
}).catch((error) => console.log(error));

const app = createExpressServer({
    controllers: [
        ArticleController,
        BranchController,
        CityController,
        EgressController,
        MeasureController,
        HeaderController,
        FamilyController,
        ExistenceController,
        MenuController,
        RoleController,
        ShoppingCartController,
        StoreController,
        StoreBranchController,
        SupplierController,
        SubsidiaryController,
        UserController,
        UserStoreController,
        UserTurnController,
        BankController
    ],
    cors: true
});

app.listen(PORT, () =>
    // tslint:disable-next-line:no-console
    console.log(`Server is running in port ${PORT}...`)
);
