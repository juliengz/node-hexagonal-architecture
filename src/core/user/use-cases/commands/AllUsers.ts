import { IUserRepository } from '../interfaces/IUserRepository';

export class AllUsers {
    private repository;

    constructor(repository: IUserRepository) {
        this.repository = repository;
    }

    async exec() {
        return this.repository.all();
    }
}
