import VerificationCode from "../../application/usecase/EmailValidation/VerificationCode";
import StorageCode from "../../application/usecase/EmailValidation/StorageCode";
import HttpServer from "../../application/http/HttpServer";


export default class EmailValidationController {
    constructor (
        readonly httpServer: HttpServer,
        readonly storageCode: StorageCode,
        readonly verificationCode: VerificationCode
    ) {
        this.httpServer.register("put", "/send-code", async (params: any, body: any) => {
            const input = body;
            console.log("send-code", input);
            const output = await this.storageCode.execute(input);
            return output;
        });

        this.httpServer.register("put", "/check-code", async (params: any, body: any) => {
            const input = body;
            console.log("check-code", input)
            const output = await this.verificationCode.execute(input);
            return output;
        });
    }
}