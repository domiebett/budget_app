import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as health from 'express-ping';
import {useExpressServer, useContainer as routeUseContainer, Action} from "routing-controllers";
import { Container} from "typedi";
import { Logger } from '../business/common/Logger';
import {Server} from "http";
import {getCurrentUser, getToken, isValidToken} from "../business/common/JWTAuth";

export class Express {
    app: express.Application;
    logger: Logger;

    constructor() {
        this.logger = new Logger();
        this.app = express();
        this.app.use(cors());
        this.app.use(health.ping());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.setUpExpressServer();
        this.app.use(this.errorHandler());
    }

    async serve(port: number): Promise<Server> {
        return this.app.listen(port, async () => {
            await this.logger.info(`App started on port ${port}`);
        });
    }

    private setUpExpressServer(): express.Application {
        routeUseContainer(Container);

        const controllersPath = path.resolve('build', 'controllers');

        return useExpressServer(this.app, {
            controllers: [controllersPath + '/*.js'],
            cors: true,
            authorizationChecker: async (action: Action) => {
                const token = await getToken(action.request);
                return isValidToken(token);
            },
            currentUserChecker: async (action: Action) => {
                return getCurrentUser(action.request);
            }
        });
    }

    errorHandler() {
        return (req: express.Request, res: express.Response, next) => {
            if (!res.headersSent) {
                return res.status(404).send({
                    message: `${req.method} for route: "${req.url}" not found.`,
                    status: 404,
                    name: 'URLNotFound',
                    error: true
                });
            }

            next();
        };
    }
}
