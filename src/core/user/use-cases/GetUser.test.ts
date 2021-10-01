import {
    UserRepository,
    existingUserStub,
} from '../../../secondary-adapters/persistence/in-memory/repository/UserRepository';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { GetUser } from './GetUser';

describe('Given I get a user with id', () => {
    let userRepository: IUserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    describe('the user exist', () => {
        test('User has been found', async () => {
            const user = await new GetUser(userRepository).exec(1);
            expect(user).toEqual(existingUserStub[0]);
        });
    });
});
