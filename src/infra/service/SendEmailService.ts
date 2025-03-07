import SendEmail from "../../application/sendEmail/SendEmail";

export class SendEmailService {

    private sendEmail: SendEmail;

    constructor (sendEmail: SendEmail) {
        this.sendEmail = sendEmail;
    }

    public send (to: string, name: string) {
        this.sendEmail.send(to, "Account created successfully",
            `Your account has been successfully created Fulano ${name}`);
    }
}