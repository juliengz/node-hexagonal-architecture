/* eslint-disable no-console */
import express from 'express';

import { AllUsers } from '../../core/user/use-cases/AllUsers';
import { CreateUser } from '../../core/user/use-cases/CreateUser';
import { DeleteUser } from '../../core/user/use-cases/DeleteUser';
import { GetUser } from '../../core/user/use-cases/GetUser';
import { UpdateUser } from '../../core/user/use-cases/UpdateUser';
import { UserRepository } from '../../secondary-adapters/persistence/postgres/repository/UserRepository';

const PORT = 8000;

export const init = async (connector: any) => {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    await connector.connect();

    app.get('/', (req, res) => res.send('Express + TypeScript Server'));

    app.get('/users', async (req, res) => {
        const users = await new AllUsers(new UserRepository()).exec();

        return res.status(200).send(users);
    });

    app.get('/user/:userId', async (req, res) => {
        const { userId } = req.params;
        const user = await new GetUser(new UserRepository()).exec(parseInt(userId, 10));

        return res.status(200).send(user);
    });

    app.post('/user', async (req, res) => {
        console.log(req.body);
        const user = await new CreateUser(new UserRepository()).exec(req.body);

        return res.status(200).send(user);
    });

    app.put('/user', async (req, res) => {
        console.log(req.body);
        const user = await new UpdateUser(new UserRepository()).exec(req.body);

        return res.status(200).send(user);
    });

    app.delete('/user/:userId', async (req, res) => {
        const { userId } = req.params;
        await new DeleteUser(new UserRepository()).exec(parseInt(userId, 10));

        return res.status(200).send(userId);
    });

    app.listen(PORT, () => {
        console.info(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
};
