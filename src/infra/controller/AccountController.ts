import HttpServer from "../../application/http/HttpServer";
import GetAccount from "../../application/usecase/Account/GetAccount";
import Login from "../../application/usecase/Account/Login";
import Register from "../../application/usecase/Account/Register";

export default class AccountController {
    constructor (
        readonly httpServer: HttpServer,
        readonly register: Register,
        readonly login: Login,
        readonly getAccount: GetAccount
    ) {
        this.httpServer.register("post", "/register", async (params: any, body: any) => {
            const input = body;
            console.log("Register", input);
            const output = await this.register.execute(input);
            return output;
        });

        this.httpServer.register("get", "/account/:{accountId}", async (params: any, body: any) => {
            const accountId = params.accountId;
            const output = await this.getAccount.execute(accountId);
            return output;
        });

        this.httpServer.register("post", "/login", async (params: any, body: any) => {
            const input = body;
            console.log("Login", input);
            const output = await this.login.execute(input);
            return output;
        });
    }
}