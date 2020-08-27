import { Authorized, Body, CurrentUser, JsonController, NotFoundError, Param, Post, Put } from "routing-controllers";
import { IMeal } from "../business/interfaces/IMeal";
import { MealAgent } from "../data/agents/MealAgent";
import { TimetableColumnAgent } from "../data/agents/TimetableColumnAgent";
import { TimetableColumn } from "../data/entities/TimetableColumn";
import { User } from "../data/entities/User";
import { Day } from "../data/entities/Day";

@JsonController('/columns/:columnId/days/:dayId/meals')
export class ColumnDayMealController {
    constructor(private columnAgent: TimetableColumnAgent, private mealAgent: MealAgent) { }

    @Authorized()
    @Post()
    async addMealToColumn(@CurrentUser() currentUser: User, @Body() requestBody: IMeal, @Param('columnId') columnId: number, @Param('dayId') dayId: number) {
        const { column, day } = await this.getColumnAndDay(currentUser, columnId, dayId);

        return this.mealAgent.addMeal(currentUser, requestBody, column, day);
    }

    @Authorized()
    @Post('/:mealId')
    async appendAMealToColumn(@CurrentUser() currentUser: User, @Param('columnId') columnId: number, @Param('dayId') dayId: number, @Param('mealId') mealId: number) {
        const { column, day } = await this.getColumnAndDay(currentUser, columnId, dayId);

        const meal = await this.mealAgent.getMeal(currentUser, mealId);
        if (!meal) {
            throw new NotFoundError(`Meal with id ${mealId} doesnt exist`);
        }

        await meal.days.push(day);
        await meal.timetableColumns.push(column);
        return meal.save();
    }

    private async getColumnAndDay(currentUser, columnId: number, dayId: number, throwError = true): Promise<{ column: TimetableColumn, day: Day }> {
        const column = await this.columnAgent.getTimetableColumn(currentUser, columnId);
        if (!column && throwError)
            throw new NotFoundError(`Timetable Column with id ${columnId} doesnt exist`);

        const day = await column.days.filter((day) => day.id === dayId)[0];
        if (!day && throwError)
            throw new NotFoundError(`Day with id ${dayId} doesnt exist`);

        return { column, day }
    }
}
