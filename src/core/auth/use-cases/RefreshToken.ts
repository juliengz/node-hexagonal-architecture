import { IUserRepository } from '../../user/domain/interfaces/IUserRepository';
import { IAccessTokenManager } from '../domain/interfaces/IAccessTokenManager';
import { IRefreshTokenRepository } from '../domain/interfaces/IRepository';

export class RefreshToken {
    private accessTokenManager;

    private userRepository;

    private refreshTokenRepository;

    constructor(
        userRepository: IUserRepository,
        accessTokenManager: IAccessTokenManager,
        refreshTokenRepository: IRefreshTokenRepository,
    ) {
        this.userRepository = userRepository;
        this.accessTokenManager = accessTokenManager;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    async exec(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('Not implemented: empty refresh token');
        }

        const storedRefreshToken = this.refreshTokenRepository.findOne(refreshToken);

        if (!storedRefreshToken) {
            throw new Error('Not implemented: refresh token does not exist or is expired');
        }

        // TODO: add decodeRefreshToken to IAccessTokenManager
        const user = this.accessTokenManager.decodeRefreshToken(refreshToken);

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
