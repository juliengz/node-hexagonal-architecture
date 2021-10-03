import { Router } from 'express';
import { AllUsers } from '../../../core/user/use-cases/AllUsers';
import { CreateUser } from '../../../core/user/use-cases/CreateUser';
import { DeleteUser } from '../../../core/user/use-cases/DeleteUser';
import { GetUser } from '../../../core/user/use-cases/GetUser';
import { UpdateUser } from '../../../core/user/use-cases/UpdateUser';
import { UserRepository } from '../../../secondary-adapters/persistence/postgres/repository/UserRepository';
import { isAuthenticaded } from '../middleware/isAuthenticated';

// TODO: Remove req.body as use cases params

export const userRouter = Router();

userRouter.get('/users', isAuthenticaded, async (req, res) => {
    const users = await new AllUsers(new UserRepository()).exec();

    return res.status(200).send(users);
});

userRouter.get('/users/:userId', isAuthenticaded, async (req, res) => {
    const { userId } = req.params;
    const user = await new GetUser(new UserRepository()).exec(parseInt(userId, 10));

    return res.status(200).send(user);
});

userRouter.post('/users', isAuthenticaded, async (req, res) => {
    const user = await new CreateUser(new UserRepository()).exec(req.body);

    return res.status(200).send(user);
});

userRouter.put('/users', isAuthenticaded, async (req, res) => {
    const user = await new UpdateUser(new UserRepository()).exec(req.body);

    return res.status(200).send(user);
});

userRouter.delete('/users/:userId', isAuthenticaded, async (req, res) => {
    const { userId } = req.params;
    await new DeleteUser(new UserRepository()).exec(parseInt(userId, 10));

    return res.status(200).send(userId);
});
