import { Body, JsonController, Post } from "routing-controllers";
import { AuthorizationException } from "../business/exceptions";
import { IUser } from "../business/interfaces";
import { IJWTUser } from '../business/interfaces/IJWTPayload';
import { JWT } from '../business/lib/JWT';
import { UserAgent } from "../data/agents/UserAgent";
import { User } from "../data/entities/User";

@JsonController('/auth')
export class AuthController {
    constructor(private userAgent: UserAgent, private jwt: JWT) { }

    @Post('/signup')
    async signup(@Body() requestBody: IUser) {
        await this.userAgent.createUser(requestBody);

        return { message: 'Sign Up successful...!!', success: true };
    }

    @Post('/signin')
    async signin(@Body() requestBody: IUser) {
        const { email, password } = requestBody;
        const user: User = await this.userAgent.getUserByEmailWithPassword(email);

        if (user && await user.isValidPassword(password)) {
            const userBody: IJWTUser = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                emailIsVerified: user.emailIsVerified
            }

            const token = await this.jwt.sign({ user: userBody }, process.env.JWT_SECRET);

            return { token, user: userBody, success: true };
        } else {
            throw new AuthorizationException('You entered the wrong email or password.');
        }
    }
}
