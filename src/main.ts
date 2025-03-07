import GetAccount from "./application/usecase/Account/GetAccount";
import Register from "./application/usecase/Account/Register";
import AccountController from "./infra/controller/AccountController";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { AccountRepositoryMemory } from "./infra/repository/AccountRepository";
import dotenv from 'dotenv';
import { SendEmailService } from "./infra/service/SendEmailService";
import { SendEmailNodeMailer } from "./infra/sendEmail/SendEmail";
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const API = new ExpressAdapter();

const database = new AccountRepositoryMemory();

const sendEmail = new SendEmailNodeMailer();
const sendEmailService = new SendEmailService(sendEmail);

const register = new Register(database, sendEmailService);
const getAccount = new GetAccount(database);

const accountController = new AccountController(API, register, getAccount);

API.listen(PORT);