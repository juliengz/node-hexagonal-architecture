import User from '../domain/entities/User';
import { IUserDto } from '../domain/interfaces/IUserDto';
import { IUserRepository } from '../domain/interfaces/IUserRepository';

export class UpdateUser {
    private repository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async exec(data: IUserDto) {
        const updatedUser = new User(data).toDto();

        return this.repository.update(updatedUser);
    }
}
