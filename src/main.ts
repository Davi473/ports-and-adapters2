import GetAccount from "./application/usecase/Account/GetAccount";
import Register from "./application/usecase/Account/Register";
import AccountController from "./infra/controller/AccountController";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { AccountRepositoryMemory } from "./infra/repository/AccountRepository";

const PORT = 3000;
const API = new ExpressAdapter();

const database = new AccountRepositoryMemory();

const register = new Register(database);
const getAccount = new GetAccount(database);

const accountController = new AccountController(API, register, getAccount);

API.listen(PORT);