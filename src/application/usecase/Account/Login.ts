import { SendEmailService } from "../../../infra/service/SendEmailService";
import AccountRepository from "../../repository/AccountRepository";
import UseCase from "../UseCase";
import jwt from "jsonwebtoken";

export default class Login implements UseCase {
    private repository: AccountRepository;
    private sendEmail: SendEmailService
    private secretKey: string;

    constructor (    
        repository: AccountRepository,
        sendEmail: SendEmailService
    ) {
        this.repository = repository;
        this.sendEmail = sendEmail;
        this.secretKey = process.env.TOKEN || "testSecretKey";
    }

    public async execute(input: Input): Promise<Output> {
        const existingAccount = await this.repository.getByEmail(input.email);
        if (!existingAccount) throw new Error("Account not already exists");
        if (existingAccount.getActive()) throw new Error("Need to activate the account");
        const token = jwt.sign({id: existingAccount.accountId, name: existingAccount.getName()}, 
            this.secretKey, { expiresIn: "15d" });
        this.sendEmail.send(existingAccount.getEmail(), existingAccount.getName());
        return {
            token
        };
    }

}

type Input = {
    email: string,
    password: string
}

type Output = {
    token: string
}