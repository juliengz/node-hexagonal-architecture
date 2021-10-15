import { IRefreshToken } from '../interfaces/IRefreshToken';

class RefreshToken implements IRefreshToken {
    private userId: number;

    private refreshToken :string;

    constructor({ userId, refreshToken }: IRefreshToken) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
