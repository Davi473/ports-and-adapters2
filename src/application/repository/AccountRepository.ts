import Account from "../../domain/entity/Account";

export default interface AccountRepository {
    getByEmail (email: string): Promise<Account | undefined>;
    getById (accountId: string): Promise<Account>;
    save (account: Account): Promise<void>;
    updateActive (id: string, active: boolean): Promise<void>
    list (): Promise<Account[]>;
}