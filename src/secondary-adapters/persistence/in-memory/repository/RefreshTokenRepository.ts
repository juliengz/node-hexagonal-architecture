import { IRefreshToken } from '../../../../core/auth/domain/interfaces/IRefreshToken';
import { IRefreshTokenRepository } from '../../../../core/auth/domain/interfaces/IRefreshTokenRepository';

export const existingRefreshTokenStub: IRefreshToken[] = [
];

export class RefreshTokenRepository implements IRefreshTokenRepository {
    private refreshTokens: IRefreshToken[] = [...existingRefreshTokenStub]

    async get(token: string): Promise<IRefreshToken | null> {
        return this.refreshTokens.find((rt) => rt.refreshToken === token) ?? null;
    }
}
