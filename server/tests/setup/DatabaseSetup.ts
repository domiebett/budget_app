import { createConnection } from 'typeorm';

export class DatabaseSetup {
    static async createTestConnection() {
        return await createConnection({
            name: 'test',
            type: 'mysql',
            host: 'budget_app_db',
            port: 3306,
            username: 'test',
            password: 'password',
            database: 'test',
            synchronize: true
        });
    }
}
