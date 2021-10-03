import { getConnection } from 'typeorm';
import { IUserDto } from '../../../../core/user/domain/interfaces/IUserDto';
import { IUserRepository } from '../../../../core/user/domain/interfaces/IUserRepository';
import { UserPersistenceModel } from '../models/UserPersistenceModel';

export class UserRepository implements IUserRepository {
    repo: any;

    constructor() {
        this.repo = getConnection().getRepository(UserPersistenceModel);
    }

    async all(): Promise<IUserDto[]> {
        const users = await this.repo.find();

        return users;
    }

    async get(id: number): Promise<IUserDto | null> {
        const user = await this.repo.findOne({ id }) ?? null;

        return user;
    }

    async findByLogin(login: string, password: string): Promise<IUserDto | null> {
        const user = await this.repo.findOne({ where: { name: login, password } }) ?? null;

        return user;
    }

    async create(data: IUserDto): Promise<IUserDto> {
        const user = await this.repo.save(data);

        return user;
    }

    async update(data: IUserDto): Promise<IUserDto> {
        const user = await this.repo.save(data);

        return user;
    }

    async delete(id: number): Promise<number> {
        const users = await this.repo.delete({ id });
        if (users.affected === 0) {
            throw Error('Character not found');
        }

        return id;
    }
}
