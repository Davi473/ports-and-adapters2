import DatabaseConnection from "../../application/database/DatabaseConnection";
import AccountRepository from "../../application/repository/AccountRepository";
import Account from "../../domain/entity/Account";

export class AccountRepositoryDataBase implements AccountRepository {

    constructor (readonly connection: DatabaseConnection) {}

    public async getByEmail (email: string): Promise<Account | undefined> {
        const [accountData] = await this.connection.query("SELECT * FROM account WHERE email = $1", [email]);
        if (!accountData) return;
        return new Account(accountData.account_id, accountData.name, accountData.email, accountData.password);
    }

    public async getById (accountId: string): Promise<Account> {
        const [accountData] = await this.connection.query("SELECT * FROM account WHERE account_id = $1", [accountId]);
        if (!accountData) throw new Error("Account not found");
        return new Account(accountData.account_id, accountData.name, accountData.email, accountData.password);
    }

    public async save (account: Account): Promise<void> {
        await this.connection.query("INSERT INTO account (account_id, name, email, password) VALUES ($1, $2, $3, $4);",
            [account.accountId, account.getName(), account.getEmail(), account.getPassword()]);
    }

    public async list (): Promise<Account[]> {
        const accountsData = await this.connection.query("SELECT * FROM account", []);
        return accountsData.reduce((accounts, accountData) => {
            accounts.push(new Account(accountData.account_id, accountData.name, accountData.email, accountData.password));
            return accounts;
        }, []);
    }
}

export class AccountRepositoryMemory implements AccountRepository {
    accounts: Account[];

    constructor () {
        this.accounts = [];
    }

    public async getByEmail (email: string): Promise<Account | undefined> {
        const [accountData] = this.accounts.filter((account: Account) => account.getEmail() === email);
        return accountData;
    }

    public async getById(accountId: string): Promise<Account> {
        const [accountData] = this.accounts.filter((account: Account) => account.accountId === accountId);
        if (!accountData) throw new Error("Account not found");
        return accountData;
    }

    public async save(account: Account): Promise<void> {
        this.accounts.push(account);
    }

    public async list(): Promise<Account[]> {
        return this.accounts;
    }
}