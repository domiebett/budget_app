import { FoodAgent } from "../data/agents/FoodAgent";
import { Post, JsonController, Authorized, CurrentUser, Body, Get } from "routing-controllers";
import { User } from "../data/entities/User";
import { IFood } from "../business/interfaces/IFood";

@JsonController('/foods')
export class FoodController {
    constructor(private foodAgent: FoodAgent) {}

    @Authorized()
    @Post()
    async addFood(@CurrentUser() currentUser: User, @Body() requestBody: IFood) {
        return this.foodAgent.addFood(currentUser, requestBody);
    }

    @Authorized()
    @Get()
    async getFood(@CurrentUser() currentUser: User) {
        return this.foodAgent.getAllFoods(currentUser);
    }
}
