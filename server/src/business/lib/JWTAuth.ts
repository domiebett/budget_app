import * as jwt from 'jsonwebtoken';
import {Request} from "express";
import {HttpError} from "routing-controllers";
import { AuthorizationException} from "../exceptions";
import {User} from "../../data/entities/User";
import {UserAgent} from "../../data/agents/UserAgent";

const tokenHeader = 'authorization';


interface Payload {
    id: number,
    firstName: string,
    lastName: string,
    email: string
}

export const isValidToken = async (token: string): Promise< boolean> => {
    try {
        const payload = getPayloadFromToken(token);
        return !!payload;
    } catch (error) {
        return false;
    }
}

export const getCurrentUser = async (request: Request): Promise<User> => {
    const token = await getToken(request);
    const payload = getPayloadFromToken(token);
    return new UserAgent().getUserById(payload.id);
}

export const getToken = async (request: Request) => {
    const bearerToken: string = request.headers[tokenHeader];
    if (!bearerToken) return null;

    const splitBearerToken = bearerToken.split(' ');
    if (splitBearerToken.length < 2) {
        throw new AuthorizationException('Invalid JWT Token: ')
    }

    return bearerToken.split(' ')[1];
}

export const getPayloadFromToken = (token: string): Payload => {
    try {
        if (!process.env.APP_SECRET) throw new AuthorizationException('Invalid JWT Secret: Please set an "JWT_SECRET" env variable');
        const payload: any = jwt.verify(token, process.env.APP_SECRET);
        // Error will be caught for a more descriptive error;
        if (!payload || !payload.user) throw new Error();
        return payload.user;
    } catch (error) {
        console.log(error)
        throw new AuthorizationException('Invalid JWT Token: Please provide a valid token for authorization');
    }
}
