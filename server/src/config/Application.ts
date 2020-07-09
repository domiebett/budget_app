import { Application as App } from 'express';
import { Express } from './Express';
import { Connection } from 'typeorm';
import { Logger } from '../business/common/Logger';
import {Http2Server} from "http2";
import { DatabaseAdapter } from "../data/adapter/DatabaseAdapter";
import {Server} from "http";

export class Application {
    private server: Http2Server;
    private express: Express;
    private logger: Logger;
    private dbAdapter: DatabaseAdapter;
    private port: number = parseInt(process.env.APP_PORT) || 3000;
    private dbConnection: Connection;

    constructor() {
        this.express = new Express();
        this.logger = new Logger();
        this.dbAdapter = new DatabaseAdapter();

        this.setupApplication();
    }

    private setupApplication(): void {
        this.serveExpressApp().then((server: Server) => {
            this.server = server;
        });
        this.connectToDatabase().then((connection: Connection) => {
            this.dbConnection = connection;
            this.logger.info(`Connected to ${process.env.DB_TYPE} database.`);
        });

        process.on('SIGINT', async () => await this.quitProcesses());
    }

    private async serveExpressApp(): Promise<Server> {
        return this.express.serve(this.port);
    }

    private async connectToDatabase(): Promise<Connection> {
        return await this.dbAdapter.connect();
    }

    private async quitProcesses(): Promise<void> {
        await this.server.close();
        await this.dbAdapter.close();
    }
}
