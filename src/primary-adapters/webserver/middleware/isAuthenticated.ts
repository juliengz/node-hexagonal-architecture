/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { VerifyErrors } from 'jsonwebtoken';

import { accessTokenSecret } from '../../../core/auth/domain/interfaces/IAuthenticator';

const jwt = require('jsonwebtoken');

export const isAuthenticaded = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err: VerifyErrors | null) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};