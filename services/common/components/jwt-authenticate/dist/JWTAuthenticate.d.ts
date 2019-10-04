import { Request, Response } from 'express';
import { HttpError } from 'routing-controllers';
/**
 * Authorization express middleware function.
 */
export declare const authorize: () => (req: Request, res: Response, next: any) => any;
/**
 * Get the current user from token
 * @param token - jwt token
 * @return { Promise<Payload> }
 */
export declare const getCurrentUser: (token: any) => Promise<Payload>;
/**
 * Check validitiy of token.
 * @param token - jwt token
 * @return { object | boolean }
 */
export declare const isValidToken: (token: string) => Promise<boolean>;
/**
 * Get the id of current JWT logged in user from request object
 * @param req - request object
 * @return {number}
 */
export declare const getUserIdFromRequest: (req: Request) => Promise<number>;
/**
 * Retrieves the User id from the jwt token
 * @param token - jwt token
 */
export declare const getPayloadFromToken: (token: any) => Payload;
/**
 * Get the token from the request object
 * @param req - request object
 */
export declare const getToken: (req: Request) => string;
export declare class AuthorizationError extends HttpError {
    status: number;
    error: boolean;
    constructor(message: any);
}
interface Payload {
    id: number;
    name: string;
    email: string;
}
export {};
