import { Authorized, CurrentUser, JsonController, Post, Body, Get } from "routing-controllers";
import { User } from "../data/entities/User";
import { MealAgent } from "../data/agents/MealAgent";
import { IMeal } from "../business/interfaces/IMeal";

@JsonController('/meals')
export class MealController {
    constructor(private mealAgent: MealAgent) { }

    @Authorized()
    @Post()
    async addMeal(@CurrentUser() currentUser: User, @Body() requestBody: IMeal) {
        return this.mealAgent.addMeal(currentUser, requestBody);
    }

    @Authorized()
    @Get()
    async getMeals(@CurrentUser() currentUser: User) {
        return this.mealAgent.getAllMeals(currentUser);
    }
}
