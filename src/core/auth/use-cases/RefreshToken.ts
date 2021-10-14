import { IUserRepository } from '../../user/domain/interfaces/IUserRepository';
import { IAccessTokenManager } from '../domain/interfaces/IAccessTokenManager';

export class RefreshToken {
    private accessTokenManager;

    // private userRepository;

    constructor(userRepository: IUserRepository, accessTokenManager: IAccessTokenManager) {
        this.accessTokenManager = accessTokenManager;
    }

    async exec(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('Not implemented: empty refresh token');
        }

        // TODO: persist refreshtoken in db and retrieve it
        // const storedRefreshToken = refreshTokenRepository.findOne({refresh_token: refreshToken});
        // if(!storedRefreshToken){
        //     throw new Error('Not implemented: refresh token does not exist or is expired');
        // }

        // TODO: add decodeRefreshToken to IAccessTokenManager
        // const user = accessTokenManager.decodeRefreshToken(refreshToken);

        // if (!user) {
        //     throw new Error('Not implemented: refresh token is invalid');
        // }

        // const newRefreshToken = this.accessTokenManager.generateRefreshToken(user);

        // TODO persist new refresh token

        return {
            accessToken: this.accessTokenManager.generate(user),
            refreshToken: newRefreshToken,
        };
    }
}
