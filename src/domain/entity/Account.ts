import { setEmitFlags } from "typescript";
import Email from "../vo/Email";
import Name from "../vo/Name";
import Password, { PasswordFactory } from "../vo/Password";
import crypto from "crypto";

export default class Account {
    private name: Name;
    private email: Email;
    private password: Password;

    constructor (
        readonly accountId: string, name: string, email: string, 
        password: string, readonly passwordType: string = "plain"
    ) {
        this.name = new Name(name);
        this.email = new Email(email);
        this.password = PasswordFactory.create(password, passwordType);
    }

    public static create (name: string, email: string, password: string): Account {
        const id = crypto.randomUUID();
        return new Account(id, name, email, password);
    }

    public getName (): string {
        return this.name.getValue();
    }

    public getEmail (): string {
        return this.email.getValue();
    }

    public setEmail (email: string): void {
        this.email = new Email(email);
    }

    public getPassword (): string {
        return this.password.value;
    }

    public verifyPassword (password: string): boolean {
        return this.password.verify(password);
    }
}