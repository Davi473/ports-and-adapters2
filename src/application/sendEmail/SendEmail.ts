export default interface SendEmail
{
    send (to: string, subject: string, text: string): Promise<void>;
}