import HttpServer from "../../application/http/HttpServer";
import express, { Express } from "express";
import cors from "cors";

export class ExpressAdapter implements HttpServer {
    private app: Express;
    
    constructor () {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
    }

    register(method: string, url: string, callback: Function): void {
        this.app[method](url.replace(/\{|}/g, ""), async (req: any, res: any) => {
            try {
                const output = await callback(req.params, req.body);
                res.json(output);
            } catch (e: any) {
                console.log("error", e.message);
                res.status(422).json({message: e.message});
            }
        });
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}