/* eslint-disable no-unused-vars */

import { IUserDto } from '../../../user/domain/interfaces/IUserDto';

export interface IAccessTokenManager {
  generate(user: IUserDto): string;
  decode(token: string): any;
  generateRefreshToken(user: IUserDto): string;
  decodeRefreshToken(token: string): any;
}
