import Account from "../../../domain/entity/Account";
import AccountRepository from "../../repository/AccountRepository";
import UseCase from "../UseCase";

export default class GetAccount implements UseCase {
    private accountRegister: AccountRepository;

    constructor (accountRegister: AccountRepository) {
        this.accountRegister = accountRegister;
    }

    public async execute(accountId: string): Promise<Output> {
        const account = await this.accountRegister.getById(accountId);
        return {
            accountId: account.accountId,
            name: account.getName(),
            email: account.getEmail(),
            password: account.getPassword(),
            active: account.getActive()
        };
    }

}

type Output = {
    accountId: string,
    name: string,
    email: string,
    password: string,
    active: boolean
}