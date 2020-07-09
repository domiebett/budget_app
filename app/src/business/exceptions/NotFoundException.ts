import {BaseException} from "./BaseException";

export class NotFoundException extends BaseException {
    constructor(message) {
        super(message, 404);
    }
}
