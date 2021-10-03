import { JWTAccessTokenManager } from '../../../secondary-adapters/auth/JWTAccessTokenManager';
import { UserRepository } from '../../../secondary-adapters/persistence/in-memory/repository/UserRepository';
import { IUserDto } from '../../user/domain/interfaces/IUserDto';
import { IUserRepository } from '../../user/domain/interfaces/IUserRepository';
import { IAccessTokenManager } from '../domain/interfaces/IAccessTokenManager';
import { GetAccessToken } from './GetAccessToken';

describe('Given want to signin', () => {
    let userRepository: IUserRepository;
    let accestokenManager: IAccessTokenManager;

    beforeEach(() => {
        userRepository = new UserRepository();
        accestokenManager = new JWTAccessTokenManager();
    });

    describe('And my credential are valid', () => {
        test('User has signed in', async () => {
            const user: IUserDto = {
                id: 1,
                name: 'maeevick',
                password: '123',
            };

            const response = await new GetAccessToken(userRepository, accestokenManager).exec('maeevick', '123');

            const decodedUserFromToken = accestokenManager.decode(response.accessToken);

            expect(decodedUserFromToken.name).toEqual(user.name);
        });
    });
});
