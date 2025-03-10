import GetAccount from "./application/usecase/Account/GetAccount";
import Register from "./application/usecase/Account/Register";
import AccountController from "./infra/controller/AccountController";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { AccountRepositoryMemory } from "./infra/repository/AccountRepository";
import { SendEmailService } from "./infra/service/SendEmailService";
import { SendEmailNodeMailer } from "./infra/sendEmail/SendEmail";
import dotenv from 'dotenv';
import Login from "./application/usecase/Account/Login";
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const API = new ExpressAdapter();

const database = new AccountRepositoryMemory();

const sendEmail = new SendEmailNodeMailer();
const sendEmailService = new SendEmailService(sendEmail);

const register = new Register(database, sendEmailService);
const login = new Login(database, sendEmailService);
const getAccount = new GetAccount(database);
const storeCode = new Stora

new AccountController(API, register, login, getAccount);

API.listen(PORT);