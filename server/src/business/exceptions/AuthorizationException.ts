import { BaseException } from './BaseException';

export class AuthorizationException extends BaseException {
    constructor(message) {
        super(message, 401);
    }
}
