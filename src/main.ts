import GetAccount from "./application/usecase/Account/GetAccount";
import Register from "./application/usecase/Account/Register";
import AccountController from "./infra/controller/AccountController";
import { ExpressAdapter } from "./infra/http/HttpServer";
import { AccountRepositoryMemory } from "./infra/repository/AccountRepository";
import { SendEmailService } from "./infra/service/SendEmailService";
import { SendEmailNodeMailer } from "./infra/sendEmail/SendEmail";
import dotenv from 'dotenv';
import Login from "./application/usecase/Account/Login";
import StorageCode from "./application/usecase/EmailValidation/StorageCode";
import EmailValidationRepositoryMemory from "./infra/repository/EmailValidationRepository";
import VerificationCode from "./application/usecase/EmailValidation/VerificationCode";
import EmailValidationController from "./infra/controller/EmailValidationController";
dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const API = new ExpressAdapter();

const database = new AccountRepositoryMemory();
const databaseEmailValidate = new EmailValidationRepositoryMemory();

const sendEmail = new SendEmailNodeMailer();
const sendEmailService = new SendEmailService(sendEmail);

const register = new Register(database, sendEmailService);
const login = new Login(database, sendEmailService);
const getAccount = new GetAccount(database);
const storageCode = new StorageCode(database, databaseEmailValidate, sendEmailService);
const verificationCode = new VerificationCode(database, databaseEmailValidate, sendEmailService);

new AccountController(API, register, login, getAccount);
new EmailValidationController(API, storageCode, verificationCode);

API.listen(PORT);