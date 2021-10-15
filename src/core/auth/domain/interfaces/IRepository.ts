/* eslint-disable no-unused-vars */

export interface IRefreshTokenRepository {
    findOne(refreshToken: string): Promise<String>;
}
