import * as jsonWebToken from 'jsonwebtoken';
import { IJWTPayload, IJWTUser } from '../interfaces/IJWTPayload';

export class JWT {
    constructor() { }

    public sign(user: IJWTPayload, jwtSecret: string) {
        return jsonWebToken.sign(user, jwtSecret);
    }
}
