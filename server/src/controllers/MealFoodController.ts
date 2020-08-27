import { JsonController, Post, Authorized, CurrentUser, Body, Param, NotFoundError } from "routing-controllers";
import { MealAgent } from "../data/agents/MealAgent";
import { FoodAgent } from "../data/agents/FoodAgent";
import { User } from "../data/entities/User";
import { IFood } from "../business/interfaces/IFood";

@JsonController('/meals/:mealId/foods')
export class MealFoodController {
    constructor(private mealAgent: MealAgent, private foodAgent: FoodAgent) { }

    @Authorized()
    @Post()
    async addFoodToMeal(@CurrentUser() currentUser: User, @Body() requestBody: IFood, @Param('mealId') mealId: number) {
        const meal = await this.mealAgent.getMeal(currentUser, mealId);
        if (!meal) {
            throw new NotFoundError(`Meal with id ${mealId} doesnt exist`);
        }

        return this.foodAgent.addFood(currentUser, requestBody, meal);
    }

    @Authorized()
    @Post('/:foodId')
    async appendFoodToMeal(@CurrentUser() currentUser: User, @Param('mealId') mealId: number, @Param('foodId') foodId: number) {
        const meal = await this.mealAgent.getMeal(currentUser, mealId);
        if (!meal) {
            throw new NotFoundError(`Meal with id ${mealId} doesnt exist`);
        }

        const food = await this.foodAgent.getFood(currentUser, foodId);
        if (!food) {
            throw new NotFoundError(`Food with id ${foodId} doesnt exist`);
        }

        meal.foods.push(food);
        return meal.save();
    }
}
