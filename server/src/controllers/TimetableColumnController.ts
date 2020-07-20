import {Authorized, Body, CurrentUser, Get, JsonController, Param, Post} from "routing-controllers";
import {TimetableColumnAgent} from "../data/agents/TimetableColumnAgent";
import {User} from "../data/entities/User";
import {ITimetableColumn} from "../business/interfaces/ITimetableColumn";
import {TimetableAgent} from "../data/agents/TimetableAgent";

@JsonController('/timetables/:timetableId/columns')
export class TimetableColumnController {
    constructor(private timetableAgent: TimetableAgent, private timetableColumnAgent: TimetableColumnAgent) { }

    @Authorized()
    @Post()
    async addTimetableColumn(@CurrentUser() currentUser: User, @Body() requestBody: ITimetableColumn, @Param('timetableId') timetableId: number) {
        const timetable = await this.timetableAgent.getTimeTable(currentUser, timetableId, false);
        return this.timetableColumnAgent.addTimetableColumn(currentUser, requestBody, timetable);
    }

    @Authorized()
    @Get()
    async getAllTimetableColumns(@CurrentUser() currentUser: User) {
        return this.timetableColumnAgent.getTimetableColumns(currentUser, true);
    }

    @Authorized()
    @Get('/:columnId')
    async getTimetableColumn(@CurrentUser() currentUser: User, @Param('columnId') columnId: number) {
        return this.timetableColumnAgent.getTimetableColumn(currentUser, columnId, true);
    }
}
