import { Authenticator } from '../../../secondary-adapters/authentication/Authenticator';
import { UserRepository } from '../../../secondary-adapters/persistence/in-memory/repository/UserRepository';
import { IUserDto } from '../../user/domain/interfaces/IUserDto';
import { IUserRepository } from '../../user/domain/interfaces/IUserRepository';
import { IAuthenticator } from '../domain/interfaces/IAuthenticator';
import { SignIn } from './SignIn';

describe('Given want to signin', () => {
    let userRepository: IUserRepository;
    let authenticator: IAuthenticator;

    beforeEach(() => {
        userRepository = new UserRepository();
        authenticator = new Authenticator();
    });

    describe('And my credential are valid', () => {
        test('User has signed in', async () => {
            const user: IUserDto = {
                id: 1,
                name: 'maeevick',
                password: '123',
            };
            const response = await new SignIn(userRepository, authenticator).exec('maeevick', '123');

            const decodedUserFromToken = authenticator.decodeUserFromToken(response.token);

            expect(decodedUserFromToken.name).toEqual(user.name);
        });
    });
});
