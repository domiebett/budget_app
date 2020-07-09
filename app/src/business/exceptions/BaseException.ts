export class BaseException extends Error {
    private error: boolean;
    private success: boolean;
    private status: number;

    constructor(message, status = 500) {
        super(message);

        this.error = true;
        this.success = false;
        this.status = status;
    }
}
