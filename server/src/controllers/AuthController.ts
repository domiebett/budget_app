import * as jwt from 'jsonwebtoken';
import {Request, Response} from "express";
import {Body, JsonController, Post, Req, Res} from "routing-controllers";
import {UserAgent} from "../data/agents/UserAgent";
import {IUser} from "../business/interfaces";
import {User} from "../data/entities/User";
import {AuthorizationException} from "../business/exceptions";

@JsonController('/auth')
export class AuthController {
    constructor(private userAgent: UserAgent) { }

    @Post('/signup')
    async signup(@Body() requestBody: IUser, @Req() req: Request, @Res() res: Response) {
        await this.userAgent.createUser(requestBody);

        return { message: 'Sign Up successful...!!', success: true };
    }

    @Post('/signin')
    async signin(@Body() requestBody: IUser, @Req() req: Request, @Res() res: Response) {
        const { email, password } = requestBody;
        const user: User = await this.userAgent.getUserByEmailWithPassword(email);

        if (user && await user.isValidPassword(password)) {
            const userBody = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                emailIsVerified: user.emailIsVerified
            }
            const token = await jwt.sign({ user: userBody }, process.env.JWT_SECRET);

            return { token, user: userBody, success: true };
        } else {
            throw new AuthorizationException('You entered the wrong email or password.');
        }
    }
}
