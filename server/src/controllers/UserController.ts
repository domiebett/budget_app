import { Authorized, CurrentUser, Get, JsonController } from "routing-controllers";
import { User } from "../data/entities/User";

@JsonController('/users')
export class UserController {
    constructor() { }

    @Authorized()
    @Get('/me')
    async me(@CurrentUser() currentUser: User) {
        return currentUser;
    }
}
