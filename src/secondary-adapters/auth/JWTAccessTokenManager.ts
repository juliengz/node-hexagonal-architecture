/* eslint-disable class-methods-use-this */

import { IAccessTokenManager } from '../../core/auth/domain/interfaces/IAccessTokenManager';
import { IUserDto } from '../../core/user/domain/interfaces/IUserDto';

const jwt = require('jsonwebtoken');

export const JWT_SECRET_TOKEN_KEY = 'shhhhhh!';
export const JWT_SECRET_REFRESH_TOKEN_KEY = 'hsssssss!';
export const JWT_EXPIRATION_TIME = '1h';

export class JWTAccessTokenManager implements IAccessTokenManager {
    generate(user: IUserDto) {
        return jwt.sign({ id: user.id, name: user.name }, JWT_SECRET_TOKEN_KEY, { expiresIn: JWT_EXPIRATION_TIME });
    }

    generateRefreshToken(user: IUserDto) {
        return jwt.sign({ id: user.id, name: user.name }, JWT_SECRET_REFRESH_TOKEN_KEY);
    }

    decode(token: string) {
        return jwt.verify(token, JWT_SECRET_TOKEN_KEY);
    }
}
