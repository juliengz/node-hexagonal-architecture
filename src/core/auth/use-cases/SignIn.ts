import { IAuthenticator } from '../../auth/domain/interfaces/IAuthenticator';
import { IUserRepository } from '../../user/domain/interfaces/IUserRepository';

export class SignIn {
    private authenticator;

    private userRepository;

    constructor(userRepository: IUserRepository, authenticator: IAuthenticator) {
        this.authenticator = authenticator;
        this.userRepository = userRepository;
    }

    async exec(login: string, password: string) {
        const user = await this.userRepository.findByLogin(login, password);

        if (user) {
            return this.authenticator.handleSignInSuccess(user);
        }

        throw new Error('Credentials are not valid.');
    }
}