import { IUserDto } from '../../domain/interfaces/IUserDto';
import User from '../../domain/model/User';
import { IUserRepository } from '../interfaces/IUserRepository';

export class CreateUser {
    private repository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async exec(data: IUserDto) {
        const newUser = new User(data).toDto();

        return this.repository.create(newUser);
    }
}
