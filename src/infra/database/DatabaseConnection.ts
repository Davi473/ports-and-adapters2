import DatabaseConnection from "../../application/database/DatabaseConnection";
import pgp from "pg-promise";

export class PgPromiseAdapter implements DatabaseConnection {
    public connection: any;

    constructor () {
        const connet = process.env.CONNECT_DATABASE
        if (!connet) throw new Error("Connect Base not exist");
        this.connection = pgp()(connet);
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }
    
    close(): Promise<void> {
        return this.connection.$pool.end();
    }
}