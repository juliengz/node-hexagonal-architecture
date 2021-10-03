/* eslint-disable no-unused-vars */

import { IUserDto } from '../../../user/domain/interfaces/IUserDto';

export const accessTokenSecret = 'youraccesstokensecret';
export const refreshTokenSecret = 'yourrefreshtokensecrethere';

export interface IAuthenticator {
  handleSignInSuccess(user: IUserDto): { token: string };
  decodeUserFromToken(token: string): IUserDto;
}