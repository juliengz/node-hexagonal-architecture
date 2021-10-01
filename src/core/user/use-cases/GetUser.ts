import { IUserRepository } from '../domain/interfaces/IUserRepository';

export class GetUser {
    private repository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async exec(id: number) {
        return this.repository.get(id);
    }
}
