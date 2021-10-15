/* eslint-disable no-unused-vars */

import { IRefreshToken } from './IRefreshToken';

export interface IRefreshTokenRepository {
    get(token: string): Promise<IRefreshToken | null>;
}
