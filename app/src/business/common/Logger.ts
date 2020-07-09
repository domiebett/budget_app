export class Logger {
    async info (message: string): Promise<void> {
        console.log(message);
    }
}
