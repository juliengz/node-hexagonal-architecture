/* eslint-disable class-methods-use-this */

import { IAuthenticator, accessTokenSecret } from '../../core/auth/domain/interfaces/IAuthenticator';
import { IUserDto } from '../../core/user/domain/interfaces/IUserDto';

const jwt = require('jsonwebtoken');

export class Authenticator implements IAuthenticator {
    handleSignInSuccess(user: IUserDto) {
        const accessToken = jwt.sign({ name: user.name }, accessTokenSecret, { expiresIn: '1h' });
        // const refreshToken = jwt.sign({ email: user.name, role: user.password }, refreshTokenSecret);

        // refreshTokens.push(refreshToken);

        return {
            token: accessToken,
        };
    }

    decodeUserFromToken(token: string) {
        return jwt.verify(token, accessTokenSecret);
    }
}
