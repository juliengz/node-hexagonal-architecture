import { IUserRepository } from '../../user/domain/interfaces/IUserRepository';
import { IAccessTokenManager } from '../domain/interfaces/IAccessTokenManager';

export class GetAccessToken {
    private accessTokenManager;

    private userRepository;

    constructor(userRepository: IUserRepository, accessTokenManager: IAccessTokenManager) {
        this.accessTokenManager = accessTokenManager;
        this.userRepository = userRepository;
    }

    async exec(login: string, password: string) {
        const user = await this.userRepository.findByLogin(login, password);

        if (!user) {
            throw new Error('Bad credentials');
        }

        return {
            accessToken: this.accessTokenManager.generate(user),
            refreshToken: this.accessTokenManager.generateRefreshToken(user),
        };
    }
}