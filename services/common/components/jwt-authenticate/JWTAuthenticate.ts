import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { HttpError } from 'routing-controllers';

const tokenHeader = 'authorization'

/**
 * Authorization express middleware function.
 */
export const authorize = () => {
    return authorizeUser;
}

/**
 * Authorize user using JWT or throw error if token is invalid
 * @param req - request object
 * @param res - response object
 * @param next - next function
 * @throws { AuthorizationError }
 */
const authorizeUser = (req: Request, res: Response, next) => {
    try {
        const token: string = getToken(req);
        if (!token) throw new AuthorizationError('Invalid JWT Token: Please ensure your token begins with "Bearer *****"');
    } catch (error) {
        return next(error);
    }

    next();
}

/**
 * Get the current user from token
 * @param token - jwt token
 * @return { Promise<Payload> }
 */
export const getCurrentUser = async (token): Promise<Payload> => {
    return getPayloadFromToken(token);
}

/**
 * Check validitiy of token.
 * @param token - jwt token
 * @return { object | boolean }
 */
export const isValidToken = async (token: string): Promise< boolean> => {
    try {
        const payload = getPayloadFromToken(token);
        return payload ? true : false;
    } catch (error) {
        return false;
    }
}

/**
 * Get the id of current JWT logged in user from request object
 * @param req - request object
 * @return {number}
 */
export const getUserIdFromRequest = async (req: Request) => {
    const token = getToken(req);
    const userPayload = getPayloadFromToken(token);
    return userPayload.id;
}

/**
 * Retrieves the User id from the jwt token
 * @param token - jwt token
 */
export const getPayloadFromToken = (token): Payload => {
    try {
        if (!process.env.APP_SECRET) throw new AuthorizationError('Invalid App Secret: Please set an "APP_SECRET" env variable');
        const payload: any = jwt.verify(token, process.env.APP_SECRET);
        // Error will be caught for a more descriptive error;
        if (!payload || !payload.user) throw new Error();
        return payload.user;
    } catch (error) {
        throw new AuthorizationError('Invalid JWT Token: Please provide a valid token for authorization');
    }
}

/**
 * Get the token from the request object
 * @param req - request object
 */
export const getToken = (req: Request): string | null | undefined => {
    const bearerToken: string = req.headers[tokenHeader];
    if (!bearerToken) return null;

    return bearerToken.split(' ')[1];
}

export class AuthorizationError extends HttpError {
    public status: number;
    public error: boolean;

    constructor(message) {
        super(401, message);
        this.name = 'AuthorizationError';
        this.status = 401;
        this.error = true;
    }
}

interface Payload {
    id: number,
    name: string,
    email: string
}
