import UseCase from "../UseCase";
import { SendEmailService } from "../../../infra/service/SendEmailService";
import EmailValidationRepository from "../../repository/EmailValidationRepository";
import AccountRepository from "../../repository/AccountRepository";

export default class StorageCode implements UseCase {
    private repositoryAccount: AccountRepository
    private repositoryEmailValidation: EmailValidationRepository;
    private sendEmail: SendEmailService

    constructor (
        repositoryAccount: AccountRepository,
        repositoryEmailValidation: EmailValidationRepository,
        sendEmail: SendEmailService
    ) {
        this.repositoryAccount = repositoryAccount;
        this.repositoryEmailValidation = repositoryEmailValidation;
        this.sendEmail = sendEmail;
    }

    public async execute(input: Input): Promise<void> {
        const existingAccount = await this.repositoryAccount.getByEmail(input.email);
        if (!existingAccount) throw new Error("Account not already exists");
        const code = await this.repositoryEmailValidation.generateCode();
        this.repositoryEmailValidation.storageCode(existingAccount.getEmail(), code);
        this.sendEmail.storeCode(existingAccount.getEmail(), existingAccount.getName(), code);
    }
}

type Input = {
    email: string,
}