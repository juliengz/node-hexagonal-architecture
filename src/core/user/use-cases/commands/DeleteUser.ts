import { IUserRepository } from '../interfaces/IUserRepository';

export class DeleteUser {
    private repository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async exec(id: number) {
        return this.repository.delete(id);
    }
}
