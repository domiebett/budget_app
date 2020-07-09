import {Authorized, CurrentUser, Get, JsonController} from "routing-controllers";
import {UserAgent} from "../data/agents/UserAgent";
import {User} from "../data/entities/User";

@JsonController('/users')
export class UserController {
    constructor(private userAgent: UserAgent) { }

    @Authorized()
    @Get('/me')
    async me(@CurrentUser() currentUser: User) {
        return currentUser;
    }
}
