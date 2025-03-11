import Account from "../../../domain/entity/Account";
import AccountRepository from "../../repository/AccountRepository";
import UseCase from "../UseCase";
import { SendEmailService } from "../../../infra/service/SendEmailService";

export default class Register implements UseCase {
    private repository: AccountRepository;
    private sendEmail: SendEmailService

    constructor (
        repository: AccountRepository,
        sendEmail: SendEmailService
    ) {
        this.repository = repository;
        this.sendEmail = sendEmail;
    }

    public async execute(input: Input): Promise<Output> {
        const existingAccount = await this.repository.getByEmail(input.email);
        if (existingAccount) throw new Error("Account already exists");
        const account = Account.create(input.name, input.email, input.password, false);
        await this.repository.save(account);
        await this.sendEmail.createdAccount(account.getEmail(), account.getName());
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