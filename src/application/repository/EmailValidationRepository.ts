export default interface EmailValidationRepository {
    generateCode (): Promise<string>;
    storeCode (email: string, codigo: string): Promise<void>;
    verificationCode (email: string, code: string): Promise<boolean>;
}