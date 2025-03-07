import Account from "../../../domain/entity/Account";
import AccountRepository from "../../repository/AccountRepository";
import UseCase from "../UseCase";
import { SendEmailService } from "../../../infra/service/SendEmailService";

export default class Register implements UseCase {
    private accountRegister: AccountRepository;
    private sendEmail: SendEmailService

    constructor (
        accountRegister: AccountRepository,
        sendEmail: SendEmailService
    ) {
        this.accountRegister = accountRegister;
        this.sendEmail = sendEmail;
    }

    public async execute(input: Input): Promise<Output> {
        const existingAccount = await this.accountRegister.getByEmail(input.email);
        if (existingAccount) throw new Error("Account already exists");
        const account = Account.create(input.name, input.email, input.password);
        await this.accountRegister.save(account);
        this.sendEmail.send(account.getEmail(), account.getName());
        return {
            accountId: account.accountId
        };
    }

}

type Input = {
    name: string,
    email: string,
    password: string
}

type Output = {
    accountId: string
}