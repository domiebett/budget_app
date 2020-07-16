import {Authorized, Body, CurrentUser, Get, JsonController, Param, Post} from "routing-controllers";
import {TimetableAgent} from "../data/agents/TimetableAgent";
import {ITimetable} from "../business/interfaces/ITimetable";
import {User} from "../data/entities/User";

@JsonController('/timetables')
export class TimetableController {
    constructor(private timetableAgent: TimetableAgent) {}

    @Authorized()
    @Post()
    async createTimetable(@CurrentUser() currentUser: User, @Body() requestBody: ITimetable) {
        return await this.timetableAgent.createTimeTable(requestBody, currentUser);
    }

    @Authorized()
    @Get()
    async getTimetables(@CurrentUser() currentUser: User) {
        return await this.timetableAgent.getAllTimetables(currentUser);
    }

    @Authorized()
    @Get('/:timetableId')
    async getTimetable(@CurrentUser() currentUser: User, @Param('timetableId') timetableId: number) {
        return await this.timetableAgent.getTimeTable(currentUser, timetableId);
    }
}
