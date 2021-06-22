/* eslint-disable no-unused-vars */
import { IUserDto } from '../../domain/interfaces/IUserDto';

export interface IUserRepository {
    all(): Promise<IUserDto[]>;
    get(id: number): Promise<IUserDto | null>;
    create(data: IUserDto): Promise<IUserDto>;
    update(data: IUserDto): Promise<IUserDto>;
    delete(id: number): Promise<number>;
}
