import { IUserDto } from '../../../../core/user/domain/interfaces/IUserDto';
import { IUserRepository } from '../../../../core/user/domain/interfaces/IUserRepository';

export const existingUserStub: IUserDto[] = [
    {
        id: 1,
        name: 'maeevick',
        password: '123',
    },
    {
        id: 2,
        name: 'diablotta',
        password: '123',
    },
];

export class UserRepository implements IUserRepository {
    private users: IUserDto[] = [...existingUserStub]

    async all(): Promise<IUserDto[]> {
        return this.users;
    }

    async get(id: number): Promise<IUserDto | null> {
        return this.users.find((u) => u.id === id) ?? null;
    }

    async findByLogin(login: string, password: string): Promise<IUserDto | null> {
        return this.users.find((u) => u.name === login && u.password === password) ?? null;
    }

    async create(data: IUserDto): Promise<IUserDto> {
        this.users.push(data);

        return this.users[this.users.length - 1];
    }

    async update(data: IUserDto): Promise<IUserDto> {
        const userIndex = this.users.findIndex((u) => u.id === data.id);

        this.users.splice(userIndex, 1, data);

        return this.users[userIndex] ?? null;
    }

    async delete(id: number): Promise<number> {
        const userIndex = this.users.findIndex((u) => u.id === id);

        this.users.splice(userIndex, 1);

        return id;
    }
}
