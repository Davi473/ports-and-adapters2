export default interface EmailValidationRepository {
    generateCode (): Promise<string>;
    storageCode (email: string, codigo: string): Promise<void>;
    verificationCode (email: string, code: string): Promise<boolean>;
}