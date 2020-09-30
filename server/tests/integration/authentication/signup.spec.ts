import { Application } from 'express';
import * as req from 'supertest';
import { Connection } from 'typeorm';
import { DatabaseSetup } from '../../setup/DatabaseSetup';
import { Express } from './../../../src/config/Express';
import { UserFaker } from './../../__fakes__/userFakes';

const app: Application = new Express().app;
let request: req.SuperTest<req.Test> = req(app);
let connection: Connection;

const route = '/auth/signup';

describe('#POST /auth/signup', () => {
    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        request = req(app);

        connection = await DatabaseSetup.createTestConnection();
    });

    beforeEach(async () => {
        connection.synchronize(true);
    });

    test('should signup successfully without returning password', async () => {
        const res = await request.post(route).send(UserFaker.valid);

        expect(res.status).toBe(201);
    });
});
