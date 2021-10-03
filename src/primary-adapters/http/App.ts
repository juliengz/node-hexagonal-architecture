/* eslint-disable no-console */
import express, { Request, Response, Express } from 'express';
import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';

export interface AppConfig {
    port: string,
    isProduction: boolean,
}

export class App {
    private readonly app: Express;

    constructor(
        private config: AppConfig,
    ) {
        this.app = express();
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());

        this.app.get('/', (req: Request, res: Response) => {
            res.send(`⚡️[Rest Api]: Ready at http://localhost:${this.config.port}`);
        });

        this.app.use(authRouter);
        this.app.use(userRouter);
    }

    start() {
        this.app.listen(this.config.port, () => {});
    }
}