import SendEmail from "../../application/sendEmail/SendEmail";

export class SendEmailService {

    private sendEmail: SendEmail;

    constructor (sendEmail: SendEmail) {
        this.sendEmail = sendEmail;
    }

    public createdAccount (to: string, name: string): void {
        this.sendEmail.send(to, "Account created successfully",
            `Your account has been successfully created ${name}`);
    }

    public storeCode (to: string, name: string, code: string): void {
        this.sendEmail.send(to, "Store Code",
            `Hello ${name}, Your validation code: ${code}`);
    }

    public validatedEmail (to: string, name: string): void {
        this.sendEmail.send(to, "validated Email",
            `Welcome ${name}, your account has been successfully validated.`);
    }

    public userLogin (to: string, name: string): void {
        this.sendEmail.send(to, "Login",
            `You just logged in ${name}`);
    }
}