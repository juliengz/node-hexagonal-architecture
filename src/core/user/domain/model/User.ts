import { IUser } from '../interfaces/IUser';
import { IUserDto } from '../interfaces/IUserDto';

export default class User implements IUser {
    private id: number;

    private name :string;

    private password :string;

    constructor({ id, name, password }: IUserDto) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    toDto(): IUserDto {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
        };
    }
}
