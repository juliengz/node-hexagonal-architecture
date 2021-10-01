import {
    UserRepository,
    existingUserStub,
} from '../../../secondary-adapters/persistence/in-memory/repository/UserRepository';
import { IUserDto } from '../domain/interfaces/IUserDto';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { AllUsers } from './AllUsers';
import { CreateUser } from './CreateUser';

describe('Given I\'m able to create a new character', () => {
    let userRepository: IUserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    describe('And the new character is valid', () => {
        test('User has been added', async () => {
            const newUser: IUserDto = {
                id: 3,
                name: 'Callista',
                password: '123',
            };
            await new CreateUser(userRepository).exec(newUser);
            const usersAfterCreateation = await new AllUsers(userRepository).exec();
            expect(usersAfterCreateation).toEqual([...existingUserStub, newUser]);
        });
    });
});
