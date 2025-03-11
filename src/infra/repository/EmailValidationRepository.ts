import EmailValidationRepository from "../../application/repository/EmailValidationRepository";

export default class EmailValidationRepositoryMemory implements EmailValidationRepository {

    private code: Map<string, string> = new Map();

    public async generateCode(): Promise<string> {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    public async storageCode(email: string, code: string): Promise<void> {
        this.code.set(email, code);
    }

    public async verificationCode(email: string, code: string): Promise<boolean> {
        const storeCode = this.code.get(email);
        return storeCode === code;
    }

}