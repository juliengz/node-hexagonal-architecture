import { Router } from 'express';
import { GetAccessToken } from '../../../core/auth/use-cases/GetAccessToken';
import { JWTAccessTokenManager } from '../../../secondary-adapters/auth/JWTAccessTokenManager';
import { UserRepository } from '../../../secondary-adapters/persistence/postgres/repository/UserRepository';

export const authRouter = Router();

authRouter.post('/auth', async (req, res) => {
    const { login, password } = req.body;

    const response = await new GetAccessToken(new UserRepository(), new JWTAccessTokenManager()).exec(login, password);

    return res.status(200).send(response);
});
