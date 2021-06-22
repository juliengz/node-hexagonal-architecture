import {
    UserRepository,
    existingUserStub,
} from '../../../../secondary-adapters/persistence/in-memory/repository/UserRepository';
import { IUserRepository } from '../interfaces/IUserRepository';
import { AllUsers } from './AllUsers';
import { DeleteUser } from './DeleteUser';

describe('Given I get a user with id', () => {
    let userRepository: IUserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    describe('the user exist', () => {
        test('User has been found', async () => {
            const deletedUserId = 1;
            await new DeleteUser(userRepository).exec(deletedUserId);
            const usersAfterDeletion = await new AllUsers(userRepository).exec();

            const userIndex = existingUserStub.findIndex((u) => u.id === deletedUserId);
            existingUserStub.splice(userIndex, 1);

            expect(usersAfterDeletion).toEqual(existingUserStub);
        });
    });
});
