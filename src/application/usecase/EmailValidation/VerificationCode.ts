import UseCase from "../UseCase";
import { SendEmailService } from "../../../infra/service/SendEmailService";
import EmailValidationRepository from "../../repository/EmailValidationRepository";
import AccountRepository from "../../repository/AccountRepository";

export default class VerificationCode implements UseCase {
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

    public async execute(input: Input): Promise<Output> {
        const existingAccount = await this.repositoryAccount.getByEmail(input.email);
        if (!existingAccount) throw new Error("Account not already exists");
        if(existingAccount.getActive()) throw new Error("Account is already validated");
        const code = await this.repositoryEmailValidation.verificationCode(input.email, input.code);
        if (!code) throw new Error("Invalid code");
        this.repositoryAccount.updateActive(existingAccount.accountId, true);
        this.sendEmail.validatedEmail(existingAccount.getEmail(), existingAccount.getName());
        return {
            message: "Successfully validated"
        }
    }
}

type Input = {
    email: string,
    code: string,
}

type Output = {
    message: string
}