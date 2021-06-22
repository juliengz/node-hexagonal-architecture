import {
    UserRepository,
    existingUserStub,
} from '../../../../secondary-adapters/persistence/in-memory/repository/UserRepository';
import { IUserDto } from '../../domain/interfaces/IUserDto';
import { IUserRepository } from '../interfaces/IUserRepository';
import { AllUsers } from './AllUsers';
import { UpdateUser } from './UpdateUser';

describe('Given I\'m able to update a new character', () => {
    let userRepository: IUserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    describe('And the new character is valid', () => {
        test('User has been updated', async () => {
            const updatedUser: IUserDto = {
                id: 2,
                name: 'yo',
                password: '456',
            };
            await new UpdateUser(userRepository).exec(updatedUser);
            const usersAfterCreateation = await new AllUsers(userRepository).exec();

            const userIndex = existingUserStub.findIndex((u) => u.id === updatedUser.id);
            existingUserStub.splice(userIndex, 1, updatedUser);

            expect(usersAfterCreateation).toEqual(existingUserStub);
        });
    });
});
