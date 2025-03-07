import nodemailer from 'nodemailer';
import SendEmail from '../../application/sendEmail/SendEmail';

export class SendEmailNodeMailer implements SendEmail {
    private transporter: any;
    private email: string | undefined

    constructor () {
        this.email = process.env.EMAIL_USER;
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.email,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    public async send(to: string, subject: string, text: string): Promise<void> {
      const mailOptions = {
        from: this.email,        
        to, subject, text
      };
      try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log(`E-mail enviado com sucesso para: ${to}`);
      } catch (error) {
        console.error(`Erro ao enviar e-mail para: ${to}`);
      }
    }
}