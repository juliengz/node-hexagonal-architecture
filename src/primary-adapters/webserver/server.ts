/* eslint-disable no-console */
import express from 'express';

import { SignIn } from '../../core/auth/use-cases/SignIn';
import { AllUsers } from '../../core/user/use-cases/AllUsers';
import { CreateUser } from '../../core/user/use-cases/CreateUser';
import { DeleteUser } from '../../core/user/use-cases/DeleteUser';
import { GetUser } from '../../core/user/use-cases/GetUser';
import { UpdateUser } from '../../core/user/use-cases/UpdateUser';
import { Authenticator } from '../../secondary-adapters/authentication/Authenticator';
import { UserRepository } from '../../secondary-adapters/persistence/postgres/repository/UserRepository';
import { isAuthenticaded } from './middleware/isAuthenticated';

const PORT = 8000;

export const init = async (connector: any) => {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    await connector.connect();

    app.get('/', (req, res) => res.send('Express + TypeScript Server'));

    app.post('/signin', async (req, res) => {
        console.log(req.body);
        const { login, password } = req.body;
        const response = await new SignIn(new UserRepository(), new Authenticator()).exec(login, password);

        return res.status(200).send(response);
    });

    app.get('/users', isAuthenticaded, async (req, res) => {
        const users = await new AllUsers(new UserRepository()).exec();

        return res.status(200).send(users);
    });

    app.get('/users/:userId', isAuthenticaded, async (req, res) => {
        const { userId } = req.params;
        const user = await new GetUser(new UserRepository()).exec(parseInt(userId, 10));

        return res.status(200).send(user);
    });

    app.post('/users', isAuthenticaded, async (req, res) => {
        console.log(req.body);
        const user = await new CreateUser(new UserRepository()).exec(req.body);

        return res.status(200).send(user);
    });

    app.put('/users', isAuthenticaded, async (req, res) => {
        console.log(req.body);
        const user = await new UpdateUser(new UserRepository()).exec(req.body);

        return res.status(200).send(user);
    });

    app.delete('/users/:userId', isAuthenticaded, async (req, res) => {
        const { userId } = req.params;
        await new DeleteUser(new UserRepository()).exec(parseInt(userId, 10));

        return res.status(200).send(userId);
    });

    app.listen(PORT, () => {
        console.info(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
};
